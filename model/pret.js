const mongoose = require('mongoose');
const uniqueValidate = require('mongoose-unique-validator');


const pretSchema = mongoose.Schema({
    userId : {type: String, required: true},
    montant: {type: Number, required: true},
    status: {type: String, required: true},
    date: {type: date, default: Date.now}
})
pretSchema.plugin(uniqueValidate);
module.exports = mongoose.model("Pret", pretSchema);

