const router = require('express').Router();
const TaskController = require('../controllers/TaskController');

// Middlewares
const verifyToken = require('../helpers/verify-token');

router.post('/create', verifyToken, TaskController.create);
router.get('/', verifyToken, TaskController.getAllTasks);
router.get('/:id', verifyToken, TaskController.getTaskById)
router.delete('/:id', verifyToken, TaskController.removeTaskById);
router.patch('/:id', verifyToken, TaskController.updateTask);

module.exports = router;
