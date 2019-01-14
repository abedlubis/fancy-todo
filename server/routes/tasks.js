var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task')
var {Authentication} = require('../Middlewares')

/* GET users listing. */
router.post('/',Authentication, taskController.create);
router.get('/',Authentication, taskController.findAll);
router.get('/myTask', Authentication, taskController.findOne)
router.put('/:id', Authentication, taskController.update);
router.delete('/:id', Authentication, taskController.delete);
module.exports = router;
