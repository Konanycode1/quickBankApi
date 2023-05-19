const User = require('../model/user');
const Solde = require('../model/solde');

exports.preCompte = (req,res,next)=>{
    User.findOne({_id:req.auth.userId})
    .then((data)=> {
        res.send("ok")
    })
    .catch((error)=> res.status(404).json({error.message}));
    
}