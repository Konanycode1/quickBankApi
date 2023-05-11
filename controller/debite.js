const Debite = require('../model/debit');
const User = require('../model/user');
const Solde = require('../model/solde');

exports.DebiteCompte = (req,res, next)=>{
    User.findOne({_id: req.auth.userId})
    .then((data)=>{
        if(!data){
            res.status.json({msg: 'Compte introuvable !!'})
            return
        }
        else if( data.codeSecret != req.body.codeSecret){
            res.status(401).json({msg: "code invalide !!!"})
            return 
        }
        else{
            Solde.findOne({userId: data._id})
            .then((sol)=> {
                const solInit = {
                    solde: sol.solde - parseInt(req.body.montant)
                }
                Solde.updateOne({userId: data._id},{...solInit,userId:data._id})
                .then(()=>{
                    const debitSol = new Debite({
                        userId: data._id,
                        ...req.body,
                        date: Date()
                    })
                    debitSol.save()
                    .then(()=> res.status(200).json({msg: 'Compte debité !!!'}))

                })
            })
        }
        
    })
    .catch((error)=> res.status(401).json({error:error.message}))
}

exports.debiteAll = (req,res,next)=>{
    Debite.find()
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(404).json({error: error.message}))
}
exports.debiteOne = (req,res,next)=>{
    console.log(req.params.id)
    Debite.find({userId:req.params.id})
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(404).json({error: error.message}))
}