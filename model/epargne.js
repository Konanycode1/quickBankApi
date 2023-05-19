const e = require('cors');
const mongoose = require('mongoose');
const uniqueValidate = require('mongoose-unique-validator');


const epargne = mongoose.Schema({
    userId: {type: String, required: true},
    solde: {type:Number, required: true},
    status: {type:String, required: true}
})

epargne.plugin(uniqueValidate);
module.exports = mongoose.model("epargne", epargne);