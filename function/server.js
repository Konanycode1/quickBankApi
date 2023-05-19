const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();
const router = require('../router/userRoute');
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());




mongoose.connect("mongodb+srv://bankquick:bankquick@cluster0.64ckrp6.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



 
app.use('/api', router)

app.listen(3000) 
// module.exports.handler = serverless(app)