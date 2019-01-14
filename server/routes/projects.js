var express = require('express');
var router = express.Router();
const projectController = require('../controllers/project')
var {Authentication, MemberAuthorization} = require('../Middlewares/index')

/* GET users listing. */
router.post('/',Authentication, projectController.create);
router.post('/:id/task',Authentication, projectController.createTask);
router.get('/',Authentication, projectController.findAll);
router.get('/myProject', Authentication, projectController.findMine)
router.get('/:id', Authentication, projectController.findOne)
router.put('/', Authentication, projectController.update);
router.put('/:id/invite/:email', Authentication, MemberAuthorization, projectController.invite)
router.delete('/:id', Authentication, projectController.delete);

module.exports = router;
