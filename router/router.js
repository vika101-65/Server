const Router = require('express');
const userController = require('../controllers/userController');

const router = new Router;

router.post('/user', userController.createUser);

router.get('/users', userController.getAll);


module.exports = router;
