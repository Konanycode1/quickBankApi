const Virement = require('../model/virement');
const User = require('../model/user');
const Solde = require('../model/solde');


exports.virement = (req,res,next)=>{
    Solde.findOne({userId:req.auth.userId})
    .then((data) => {
        if( !data){
            res.status(404).json({msg: "Desolé vous ne pouvez pas effectuer d'action, Veuillez vous connectez à nouveau "});
            return
        }
        if(data.solde == 0){
            res.status(401).json({msg: 'votre solde est insuffissant'})
            return
        }
        else if ( data.solde < req.body.montant){
            return res.status(401).json({msg: 'votre solde est insuffissant'})
        }
        else if ( data.solde == req.body.montant){
            return res.status(401).json({msg: 'votre montant ne peut pas etre retirer Veuillez dimunué le montant à retirer.'})
        }
        else{
            User.findOne({email: req.body.emailClient})
            .then((user)=>{
                if(!user){
                    res.status(404).json({msg: "ce compte n'existe pas !!!"})
                    return
                }
                Solde.findOne({userId: user._id},)
                .then((credit)=>{
                    if(!credit){
                        res.status(401).json({msg: `Erreur de visualisation de Solde`})
                    }
                    const soldeobjet = {
                        ...req.body,
                        solde: credit.solde + parseInt(req.body.montant)
                    };
                    Solde.updateOne({userId: user._id}, {...soldeobjet,userId: user._id})
                    .then(()=>{
                        const soldeEnv = {
                            solde: data.solde - parseInt(req.body.montant)
                        }
                        Solde.updateOne({userId:data.userId},{...soldeEnv, userId: data.userId})
                        .then(()=>{
                            const vire = new Virement({...req.body,userId: user._id,date: Date()})
                            vire.save()
                            .then(()=>res.status(201).json({msg: `Virement effactué avec success !!!`}) )
                            .catch((error)=> res.status(401).json({error: error.message}))
                        })
                        .catch((error)=> res.status(401).json({error: error.message}))
                    })
                    .catch((error)=> res.status(401).json({error: error.message}))
                })
                .catch((error)=> res.status(404).json({error: error.message}))
            })
            .catch((error)=> res.status(404).json({error: error.message}))
        }
    })
    .catch((error)=>res.status(401).json({error: error.message}))
}

exports.virementAll = (req,res,next)=>{
    Virement.find()
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(404).json({error: error.message}))
}
exports.virementOne = (req,res,next)=>{
    Virement.find({_id:req.params.id})
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(404).json({error: error.message}))
}
exports.virementAlluser = (req,res,next)=>{
    Virement.find({userId:req.params.id})
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(404).json({error: error.message}))
}