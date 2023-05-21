
const express = require('express');
const router = express.Router();
const controller = require('../controller/user');
const  vire = require('../controller/virement');
const credi = require('../controller/credite')
const auth = require("../middleware/auth");
const debit = require('../controller/debite');
const gestion = require('../controller/espaceEntre');
const epargne = require('../controller/epargne');
const pret = require('../controller/pret');

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
router.post('/gestionDebite/', gestion.DebiteClient)
router.post('/gestionCredite/', gestion.CrediteClient);
router.post('/epargneSous/',auth, epargne.epargneSous);
router.post('/pret/',auth,pret.preCompte);
module.exports = router;