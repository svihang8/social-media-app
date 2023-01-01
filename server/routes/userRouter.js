const router = require('express').Router();
const {encryptPassword} = require('../controllers/authController');
const controller = require('../controllers/userController');

router
.route('/:id')
.get(controller.getUser)
.put(controller.handleData, encryptPassword, controller.updateUser)
.delete(controller.deleteUser)

module.exports = router;