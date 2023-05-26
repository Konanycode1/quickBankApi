const mongoose = require('mongoose');
const uniqueValidate = require('mongoose-unique-validator');


const histoEpargne = mongoose.Schema({
    userEp: {type: String, required: true},
    userId: {type: String, required: true},
    montant: {type: Number, rquired: true},
    date: {type: Date, default: Date.now},
    status: {type: String, required: true}
}) 

histoEpargne.plugin(uniqueValidate);

module.exports = mongoose.model("HistoEpargne", histoEpargne);