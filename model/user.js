const mongoose = require('mongoose');
const uniqueValidate = require("mongoose-unique-validator")

const mongooseShema = mongoose.Schema({
    nom:{type:String,required: true},
    prenom:{type:String,required: true},
    adresse:{type:String,required: true},
    contact:{type:String,required: true},
    email:{type:String,required: true, unique:true},
    sexe:{type:String,required: true},
    statutCompte: {type: String,required: true},
    statutExist: {type:String, required:true},
    carteVisa: {type: String, required: true}
});
mongooseShema.plugin(uniqueValidate);
module.exports = mongoose.model("User", mongooseShema)