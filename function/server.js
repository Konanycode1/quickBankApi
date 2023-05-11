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
const debit = require('../controller/debite')



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


router.post('/',controller.UserAccount);
router.post('/login/', controller.Userlog);
router.get('/allUser/', controller.recupUserAll);
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
app.use('/api', router)

app.listen(3000)
// module.exports.handler = serverless(app)