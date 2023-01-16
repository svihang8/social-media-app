const router = require('express').Router();
const controller = require('../controllers/postController');
    
// create post
// update post
// delete post
// like post
// get all posts of user


router
.route('/')
.post(controller.createPost)



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