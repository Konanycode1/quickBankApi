const User = require('../model/user');
const bcrypt = require('bcryptjs');

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
                statutExist: req.body.statutExist,
                carteVisa:  req.body.carteVisa,
                numeroClient: generate,
                password:  hash
            })
            user.save()
            .then(()=> res.status(201).json({ msg: "create account validate !!"}))
            .catch((error)=> res.status(400).json({ error: error.message}));
        })    
    })
    .catch((error)=> res.status(400).json({error: error.message}));
}
exports.Userlog = (req, res, next)=>{
    
}