const Router = require('express');
const userController = require('../controllers/userController');

const router = new Router;

router.post('/user/registration', userController.registration);

router.get('/users', userController.getAll);


module.exports = router;
