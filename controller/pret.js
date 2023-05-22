const User = require('../model/user');
const Solde = require('../model/solde');
const Pret = require('../model/pret');


exports.preCompte = (req,res,next)=>{
    const seuil = 1500000
    User.findOne({_id:req.auth.userId})
    .then((data)=> {
        if(!data){
            res.status(404).json({msg: "Compte introuvable !!!!"});
            return 
        }
        else if ( data.codeSecret != req.body.codeSecret){
            res.status(401).json({msg: "Mot de passe oublié !!"});
            return
        }
        else{
            Pret.findOne({userId : data._id})
            .then((val)=>{
                if(!val){
                    if( req.body.montant > seuil){
                        res.status(401).json({msg: "vous avez depassez votre seuil de demande veuillez demander en dessous de 1500.000" })
                    }
                    else{
                        const pret = new Pret({
                            userId : data._id,
                            montant: req.body.montant,
                            status: req.body.status
                        })
                        pret.save()
                        .then(()=> res.status(200).json({msg: 'Prêt en cours veuillez patienté pour la validation de votre requête '}))
                        .catch((error)=> res.status(401).json({error: error.message}))
                    }
                }
                else{
                    
                        const pret = new Pret({
                            userId : data._id,
                            montant: req.body.montant,
                            status: req.body.status
                        })
                        pret.save()
                        .then(()=> res.status(200).json({msg: 'Prêt en cours veuillez patienté pour la validation de votre requête '}))
                        .catch((error)=> res.status(401).json({error: error.message}))
                }
            })
            .catch((error)=> res.status(404).json({error: error.message}))
        }
    })
    .catch((error)=> res.status(404).json({ error: error.message}));
    
}
exports.pretOne = (req, res, next) =>{
    User.findOne({_id: req.auth.userId})
    .then((data)=> {
        if(!data){
            res.status(401).json({msg: "Cet compte est introuvable!!"})
            return 
        }
        else{
            Pret.findOne({_id: req.params.id})
            .then((data)=> res.status(200).json({data}))
            .catch((error)=>res.status(404).json({error:error.message}))
        }
    })
    .catch((error)=> res.status(404).json({error:error.message}))

}

exports.pretAllUser = (req,res)=>{
    User.findOne({_id: req.auth.userId})
    .then((data)=> {
        if(!data){
            res.status(401).json({msg: "Cet compte est introuvable!!"})
            return 
        }
        else{
            Pret.find({userId: req.params.id})
            .then((data)=> res.status(200).json({data}))
            .catch((error)=>res.status(404).json({error:error.message}))
        }
    })
    .catch((error)=> res.status(404).json({error:error.message})) 
}
exports.pretAll = (req,res,next) => {
    Pret.find()
    .then((data)=> res.status(200).json({data}))
    .catch((error)=> res.status(404).json({error: error.message}))
}