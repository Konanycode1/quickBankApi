const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

router.get('/',(req, res)=> res.send("hello my serverless avaibale!!"))

app.use('/.netlify/function/api', router )



module.exports.handler = serverless(app)