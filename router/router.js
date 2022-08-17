const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router;

router.post('/user/registration', userController.registration);

router.post('/user/login', userController.login);

router.get('/user/auth', authMiddleware, userController.check);


module.exports = router;
