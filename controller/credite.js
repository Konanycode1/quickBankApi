const Credite = require('../model/credite');
const User = require('../model/user');
const Solde = require('../model/solde');

exports.CrediteCompte = (req,res,next) => {
User.findOne({_id:req.auth.userId})
.then((data) => {
    if(!data){
        res.status(401).json({msg: "compte n'existe pas !!!"});
        return
    }
    else if(data.codeSecret != req.body.codeSecret){
        res.status(401).json({ msg: `Code secret incorrect !!`})
        return
    }
    else{
        Solde.findOne({userId: data._id})
        .then((val)=> {
            const sol = {
                solde: val.solde + parseInt(req.body.montant)
            }
            Solde.updateOne({userId: data._id}, {...sol,userId: data._id})
            .then(()=> {
                const credit = new Credite({
                    userId:data._id,
                    ...req.body,
                    date: Date()
                })
                credit.save()
                .then(()=> res.status(201).json({msg: `Compte crédité Merci pour votre attention`}))
                .catch((error)=> res.status(401).json({error: error.message}))
            })
            .catch((error)=> res.status(401).json({error: error.message}))
        })
        .catch((error)=> res.status(401).json({error: error.message}))
    }  
})
.catch(()=> res.status(404).json({error:error.message}))
}
exports.CrediteAll = (req,res,next)=>{
    Credite.find()
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(404).json({error: error.message}))
}
exports.CrediteOne = (req,res,next)=>{
    Credite.find({userId:req.params.id})
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(404).json({error: error.message}))
}