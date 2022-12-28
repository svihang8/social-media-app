const router = require('express').Router();
const controller = require('../controllers/authController');

router
.route('/register')
.post(controller.encryptPassword, controller.signUp)

router
.route('/login')
.post(controller.login)
    
module.exports = router;