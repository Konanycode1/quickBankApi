const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const controller = require('../controller/user');
const  vire = require('../controller/virement');
const credi = require('../controller/credite')
const auth = require("../middleware/auth");
const debit = require('../controller/debite');
const gestion = require('../controller/espaceEntre');
const epargne = require('../controller/epargne');
const pret = require('../controller/pret');




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


router.get('/', controller.recupUserAll);
router.post('/signup/',controller.UserAccount);
router.post('/login/', controller.Userlog);
router.put("/updatePass/", controller.updateUser);
router.post('/virement/',auth,vire.virement);
router.get('/virementAll/',auth,vire.virementAll);
router.get('/virementOne/:id',auth,vire.virementOne);
router.post('/credite/',auth,credi.CrediteCompte);
router.get('/crediteAll/',auth,credi.CrediteAll);
router.get('/crediteOne/:id',auth,credi.CrediteOne);
router.post('/debite/',auth,debit.DebiteCompte);
router.get('/debiteAll/',auth,debit.debiteAll);
router.get('/debiteOne/:id',auth,debit.debiteOne);
router.post('/gestionDebite/', gestion.DebiteClient)
router.post('/gestionCredite/', gestion.CrediteClient);
router.post('/epargneSous/',auth, epargne.epargneSous);
router.post('/pret/',auth,pret.preCompte);


app.use('/.netlify/functions/server', router)

// app.listen(3000) 
module.exports.handler = serverless(app)