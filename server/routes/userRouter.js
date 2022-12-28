const router = require('express').Router();
const controller = require('../controllers/userController');

router.route('/')
      .get(controller.getUsers)

router.route('/:id')
      .get(controller.getUser)
      .post(controller.createUser)
      .put(controller.updateUser)
      .delete(controller.deleteUser);

module.exports = router;