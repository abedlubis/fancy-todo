var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index')
var {verifyToken} = require('../Middlewares/index')



/* GET home page. */
router.post('/login', indexController.login);
router.post('/register', indexController.register);
router.post('/googlesign', verifyToken, indexController.loginGoogle)

module.exports = router;
