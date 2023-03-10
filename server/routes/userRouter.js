const router = require('express').Router();
const {encryptPassword} = require('../controllers/authController');
const controller = require('../controllers/userController');

router
.route('/:id')
.get(controller.getUser)
.put(controller.handleData, encryptPassword, controller.updateUser)
.delete(controller.deleteUser)

router
.route('/:id/friend')
.put(controller.friendUser)

router
.route('/:id/unfriend')
.put(controller.unfriendUser)

module.exports = router;