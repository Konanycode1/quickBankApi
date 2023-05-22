const Solde = require('../model/solde');
const User = require("../model/user");
const Epargne = require('../model/epargne');
const Histo = require('../model/histoEpargne')

exports.epargneSous = (req,res, next)=>{
    User.findOne({_id: req.auth.userId})
    .then((data)=>{
        if(!data){
            res.status(401).json({msg: "Cet compte est introuvable"});
            return 
        }
        else{
            
            if(data._id != req.auth.userId){
                res.status(401).json({msg: "veuillé vous authentifié à niveau"});
                return 
            }
            else if(data.codeSecret != req.body.codeSecret){
                res.status(401).json({msg: "Code secret incorrect !!!"});
                return 
            }
            else{
                Solde.findOne({userId: data._id})
                .then((sold)=>{
                    if(!sold){
                        res.status(404).json({msg: "Votre solde est introuvable"});
                        return
                    }
                    else{
                        if( sold.solde  < req.body.montant || sold.solde == req.body.montant){
                            res.status(404).json({msg: "Votre solde est insuffisant"});
                            return 
                        }
                        else{
                            Epargne.findOne({userId: data._id})
                            .then((epar)=>{
                                console.log(epar)
                                if(epar === null){
                                    const epargn = new Epargne({
                                        userId: data._id,
                                        solde: req.body.montant,
                                        status: req.body.periode
                                    })
                                    epargn.save()
                                    .then((val)=>{
                                        const solde = {
                                            solde: parseInt(sold.solde)  - parseInt(req.body.montant)
                                        }
                                        Solde.updateOne({userId: data._id},{...solde, userId: data._id})
                                        .then(()=>
                                        {   
                                            const histo = new Histo({
                                                userEp: val._id,
                                                montant: req.body.montant,
                                                date: Date.now(),
                                                status: req.body.periode
                                            })
                                            histo.save()
                                            .then(()=>res.status(201).json({msg: "Vous avez épargnez merci pour la confiance"}))
                                            .catch((error)=> res.status(404).json({error: error.message}))
                                        })
                                        .catch((error)=> res.status(404).json({error: error.message}))

                                    })
                                    .catch((error)=> res.status(404).json({error: error.message}))
                                }
                                else{
                                   
                                  Epargne.findOne({userId: data._id})
                                  .then((epg)=> {
                                        const epagnCount = {
                                            solde : parseInt(epg.solde) + parseInt(req.body.montant)
                                        }
                                        Epargne.updateOne({userId:epg.userId }, {...epagnCount,userId:epg.userId })
                                        .then(()=>{
                                            const donne = {
                                                solde: parseInt(sold.solde)  - parseInt(req.body.montant)
                                            }
                                            Solde.updateOne({userId: data._id},{...donne, userId: data._id})
                                            .then(()=>
                                            {   
                                                const histo = new Histo({
                                                    userEp: epg._id,
                                                    montant: req.body.montant,
                                                    date: Date.now(),
                                                    status: req.body.periode
                                                })
                                                histo.save()
                                                .then(()=>res.status(201).json({msg: "Vous avez épargnez merci pour la confiance"}))
                                                .catch((error)=> res.status(404).json({error: error.message}))
                                            })
                                            .catch((error)=> res.status(404).json({error: error.message}))
                                        })
                                        .catch((error)=> res.status(404).json({error: error.message}))
                                    })
                                    .catch((error)=> res.status(404).json({error: error.message}))

                                }
                            })
                            .catch((error)=> res.status(404).json({error: error.message}))


                        }    
                    }
                })
            }
        } 
    })
    .catch((error)=> res.status(401).json({error: error.message}))
}

exports.epargneOne = (req, res, next) =>{
    User.findOne({_id: req.auth.userId})
    .then((data)=> {
        if(!data){
            res.status(401).json({msg: "Cet compte est introuvable!!"})
            return 
        }
        else{
            Epargne.findOne({_id: req.params.id})
            .then((data)=> res.status(200).json({data}))
            .catch((error)=>res.status(404).json({error:error.message}))
        }
    })
    .catch((error)=> res.status(404).json({error:error.message}))

}

exports.epargneAllUser = (req,res)=>{
    User.findOne({_id: req.auth.userId})
    .then((data)=> {
        if(!data){
            res.status(401).json({msg: "Cet compte est introuvable!!"})
            return 
        }
        else{
            Epargne.find({userId: req.params.id})
            .then((data)=> res.status(200).json({data}))
            .catch((error)=>res.status(404).json({error:error.message}))
        }
    })
    .catch((error)=> res.status(404).json({error:error.message})) 
}
exports.epargneAll = (req,res,next) => {
    Epargne.find()
    .then((data)=> res.status(200).json({data}))
    .catch((error)=> res.status(404).json({error: error.message}))
}