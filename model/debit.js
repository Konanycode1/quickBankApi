const mongoose = require('mongoose');
const uniqueValidate = require('mongoose-unique-validator');

const debiteSchama = mongoose.Schema({
    userId:{type:String, required:true},
    moyenTrans : {type:String,required:true},
    montant: {type:String, required: true},
    numero: {type: String, required: true},
    codeSecret: {type:String, required:true},
    date: {type: String, required: true}
})

debiteSchama.plugin(uniqueValidate);
module.exports = mongoose.model("Debite", debiteSchama);