const User = require('../model/user');
const bcrypt = require('bcryptjs');

exports.UserAccount = (req,res, next)=>{
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
                genre:req.body.sexe,
                statutCompte: req.body.statutCompte,
                statutExist: req.body.statutExist,
                carteVisa:  req.body.carteVisa,
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
    res.status(200).json({
        msg: "log valide !!"
    })
}