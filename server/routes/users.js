var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
const {Authentication} = require('../Middlewares')


/* GET users listing. */
router.get('/',Authentication, userController.findOne);
router.put('/:id',Authentication, userController.update);
router.delete('/:id',Authentication, userController.delete);


module.exports = router;
