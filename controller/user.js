const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Solde = require('../model/solde');
const solde = require('../model/solde');

exports.UserAccount = (req,res, next)=>{
    let tab = [0,1,2,3,4,5,6,7,8,9];
    let generate;
    let gen1 = '';
    let gen2 = '';
    let gen3 = '';
    let gen4 = '';
    const codeBank = 'BKQ2023'
    const codePays = 'CI'

    for(let i = 0; i< 4; i++){
        let val= Math.floor(Math.random()*tab.length)
        let val2= Math.floor(Math.random()*tab.length)
        let val3= Math.floor(Math.random()*tab.length)
        let val4= Math.floor(Math.random()*tab.length)
        gen1 += tab[val];
        gen2 += tab[val2];
        gen3 += tab[val3];
        gen4 += tab[val4];

    }
    generate = `${codeBank}-${codePays} ${gen1} ${gen2} ${gen3} ${gen4}`
    User.findOne({email: req.body.email})
    .then( user => {
        if(user){
            res.status(404).json({
                info: "Account!!",
                msg: 'cet mail existe déjà !!!'
            })
        }
        bcrypt.hash(req.body.password,10)
        .then(hash=> {
            const user = new User({
                nom:req.body.nom,
                prenom:req.body.prenom,
                adresse:req.body.adresse,
                contact:req.body.contact,
                email:req.body.email,
                genre:req.body.genre,
                pays:req.body.pays,
                statutCompte: req.body.statutCompte,
                codeSecret:`${req.body.nom.substring(0,3)}${Math.floor(Math.random()*(99-10)+10)}`,
                statutExist: req.body.statutExist,
                carteVisa:  req.body.carteVisa,
                numeroClient: generate,
                password:  hash,
                date: Date()
            })
            user.save()
            .then((data)=>{
                console.log(data)
                
                const solde = new Solde({
                    userId : data._id,
                    numeroCompte: data.numeroClient,
                    solde: 0

                })
                solde.save()
                .then(()=>res.status(201).json({ msg: "create account validate !!"}))
                .catch((error)=> res.status(400).json({ error: error.message}));
            } )
            .catch((error)=>{
                // res.status(400).json({ error: error.message})
                console.log("errorr")
            });
        })    
    })
    .catch((error)=> res.status(400).json({error: error.message}));
}
exports.Userlog = (req, res, next)=>{
    console.log(req.body.email)
    User.findOne({email: req.body.email})
    .then((user)=>{
        if (!user) {
            res.status(401).json({msg: 'User not found'})
            return
        }
        if(user.email != req.body.email)
        {
            res.status(401).json({msg: "cet identifiant n'existe pas!!"})
            return 
        }
         
        bcrypt.compare(req.body.password, user.password)
        .then((valid)=>{
            if(!valid) return res.status(401).json({msg : "mot de passe incorrecte !!"})
            res.status(200).json({
                userId : user._id,
                token: jwt.sign({userId: user.id},
                    "RANDOM_TOKEN_KEY",
                    {expiresIn: '24h'}
                    )
            });
        })
        .catch((error)=> res.status(401).json({error: error.message}));
    })
    .catch((error)=> res.status(500).json({error: error.message})); 
}
exports.updateUser = (req, res,next)=> {
    User.findOne({email:req.body.email})
    .then((data)=>{
        if(!data || data.codeSecret != req.body.codeSecret) return res.status(401).json({msg: "compte introuvaable !!!"})
        bcrypt.hash(req.body.password,10)
        .then(newhash=>{
            const user ={
                nom:data.nom,
                prenom:data.prenom,
                adresse:data.adresse,
                contact:data.contact,
                email:req.body.email,
                genre:data.genre,
                pays:data.pays,
                statutCompte: data.statutCompte,
                codeSecret: data.codeSecret,
                statutExist: data.statutExist,
                carteVisa:  data.carteVisa,
                numeroClient: data.numeroClient,
                password:  newhash,
                date: data.date
            }
            User.updateOne({email:data.email},{...user,codeSecret:req.body.codeSecret})
            .then(()=> res.status(200).json({msg: "Modification effectuée"}))
            .catch((error)=> res.status(401).json({error: error.message}));
            
        })
       
        
    })
}

exports.recupUserAll = (req,res, next)=>{
    User.find()
    .then((data)=> res.status(200).json({data}))
    .catch((error)=> res.status(404).json({error: error.message}))
}
