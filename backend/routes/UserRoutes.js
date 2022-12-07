const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.get('/', UserController.home);


module.exports = router;