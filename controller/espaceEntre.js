const Credite = require('../model/credite');
const Debite = require('../model/debit');
const User = require('../model/user');
const Solde = require('../model/solde')

exports.DebiteClient = (req,res)=>{
    User.findOne({numeroClient: req.body.numeroClient})
    .then((data)=>{
        if(!data){
            res.status(404).json({msg: "Comptes introuvable !!"})
            return 
        }
        else if(data.codeSecret != req.body.codeSecret){
            res.status(404).json({msg: "Code secret introuvable"})
            return 
        }
        else{
           
            Solde.findOne({userId: data._id})
            .then((item)=> {
                if(item.solde == 0 || item.solde < req.body.montant){
                    res.status(401).json({msg: "Compte insuffissant"})
                    return 
                }

                const debit = {
                    Solde: item.solde - parseInt(req.body.montant)
                 }
                Solde.updateOne({userId: data._id}, {...debit,userId: data._id })
                .then(()=> {
                    const debitEff = new Debite({
                        userId: data._id,
                        moyenTrans: "Guichet",
                        montant: req.body.montant,
                        numero:"xxxxxxxxxxxxxxxxx",
                        codeSecret: req.body.codeSecret,
                        date: Date()
                    })
                    debitEff.save()
                    .then(()=> res.status(200).json({msg: "compte débité"}))
                    .catch((error)=> res.status(401).json({error: error.message}))
                })
                .catch((error)=> res.status(500).json({error: error.message}))
            })
        }
    })
    .catch((error)=> res.status(500).json({error: error.message}))

}
exports.CrediteClient = (req,res)=>{
    User.findOne({numeroClient: req.body.numeroClient})
    .then((data)=>{
        if(!data){
            res.status(404).json({msg: "Comptes introuvable !!"})
            return 
        }
        else if(data.codeSecret != req.body.codeSecret){
            res.status(404).json({msg: "Code secret introuvable"})
            return 
        }
        else{
           
            Solde.findOne({userId: data._id})
            .then((item)=> {

                const credit = {
                    Solde: item.solde + parseInt(req.body.montant)
                 }
                Solde.updateOne({userId: data._id}, {...credit,userId: data._id })
                .then(()=> {
                    const crediEff = new Debite({
                        userId: data._id,
                        moyenTrans: "Guichet",
                        codeValide: "xxxxxxxxxx",
                        montant: req.body.montant,
                        numero:"xxxxxxxxxxxxxxxxx",
                        codeSecret: req.body.codeSecret,
                        date: Date()
                    })
                    crediEff.save()
                    .then(()=> res.status(200).json({msg: "compte credité"}))
                    .catch((error)=> res.status(401).json({error: error.message}))
                })
                .catch((error)=> res.status(500).json({error: error.message}))
            })
        }



    })
    .catch((error)=> res.status(500).json({error: error.message}))
}