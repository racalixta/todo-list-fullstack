const router = require('express').Router();
const UserController = require('../controllers/UserController');

// middlewares
const verifyToken = require('../helpers/verify-token');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', UserController.home);
router.patch('/:id', verifyToken, UserController.updateUser);


module.exports = router;
