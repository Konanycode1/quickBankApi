const mongoose = require('mongoose')
const uniqueValidate = require('mongoose-unique-validator');

const soldeSchema = mongoose.Schema({
    userId: {type: String, required: true},
    numeroCompte: {type: String, required: true},
    solde: {type: Number, required: true}
})
soldeSchema.plugin(uniqueValidate);
module.exports = mongoose.model('Solde',soldeSchema);