const controller = require('../controller/user');
const express = require('express');
const router = express.Router();
router.post('/', controller.UserAccount);