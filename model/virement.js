const mongoose = require('mongoose');
const uniqueValidate = require("mongoose-unique-validator");

const virement = mongoose.Schema({
    numeroCompte : {type: String, required:true},
    emailClient: {type: String, required:true},
    montant: {type:String, required:true},
    codeSecret: {type:String, required: true},
    userId: {type:String, required: true},
    date: {type:String, required: true},
})
virement.plugin(uniqueValidate);
module.exports = mongoose.model("Virement", virement);