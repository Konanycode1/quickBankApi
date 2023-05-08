const User = require('../model/user');

exports.UserAccount = (req,res, next)=>{
    res.status(200).json({
        msg:"message valide !!!"
    })
}