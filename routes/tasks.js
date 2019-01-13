var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task')
var {Authentication} = require('../Middlewares')

/* GET users listing. */
router.post('/',Authentication, taskController.create);
router.get('/',Authentication, taskController.findAll);
router.get('/:id', Authentication, taskController.findOne)
router.put('/', Authentication, taskController.update);
router.delete('/', Authentication, taskController.delete);
module.exports = router;
