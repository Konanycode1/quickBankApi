const Solde = require('../model/solde');
const User = require("../model/user");

exports.epargneSous = (req,res, next)=>{
    User.findOne()
    .then((data)=>{
        if(!data){
            res.status(401).json({msg: "Cet compte est introuvable"});
            return 
        }
        console.log("ok")

    })
    .catch((error)=> res.status(401).json({error: error.message}))
}