const User = require('../models/User');

exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id
        if(id) {
            const user = await User.findById(id);
            if(user) {
                res.json({
                    user : user,
                })
            } else {
                res.json({
                    message : 'user with id not found'
                })
            }
        } else {
            res.json({
                message : 'invalid user'
            })
        }            
    } catch (error) {
        console.error(error);
        res.json({
            'message' : 'error'
        })
    }
}

exports.handleData = async(req, res, next) => {
    try {
        if(!req.body.password) {
            res.locals.skipFunc = true
        }
    } catch (error) {
        console.error(error);
        res.json({
            'message' : 'error',
        }).status(500).end()
    }
    next()
}

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        let data = req.body;
        if (data.password) {
            data.password = res.locals.hashedPassword
            console.log(data.password);
        }

        const user = await User.findByIdAndUpdate(id, data, {new : true});

        if(user) {
            res.json({
                'message' : 'success',
                'user' : user,
            }).status(200).end()
        } else {
            res.json({
                'message' : 'couldn\'t update user'
            }).status(403).end()
        }
    } catch (error) {
        console.error(error);
        res.json({
            'message' : error
        }).status(500).end()
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);
    
        if(user) {
            res.json({
                user : user,
            })
        } else {
            res.json({
                'message' : 'couldn\'t delete user',
            })
        }            
    } catch (error) {
        console.error(error);
        res.json({
            'message' : 'error',
        });
    }

}

exports.friendUser = async (req, res, next) => {
    try {
        const id1 = req.params.id
        const id2 = req.body.id
        if(!id1 || !id2) {
            res.json({
                'message' : 'no id'
            }).status(403).end()
            return
        }

        let user1 = await User.findById(id1).exec();
        let user2 = await User.findById(id2).exec();
        
        if(!user1 || !user2) {
            res.json({
                'message' : 'Invalid id'
            }).status(403).end()
            return
        }

        if(user1.friends.includes(id2) && user2.friends.includes(id1)) {
            res.json({
                'message' : 'already friends'
            }).status(403).end()
            return
        }

        let updatedUser1 = await user1.updateOne({$push : {friends:id2}})
        let updatedUser2 = await user2.updateOne({$push : {friends:id1}})

        if(updatedUser1 && updatedUser2) {
            res.json({
                'message' : 'updated friends',
                'user' : updatedUser1,
            }).status(200).end()
        }
    } catch (error) {
        console.error(error);
        res.json({
            'message' : 'error',
        }).status(500).end()
    }
}

exports.unfriendUser = async(req, res, next) => {
    try {
        const id1 = req.params.id
        const id2 = req.body.id
        if(!id1 || !id2) {
            res.json({
                'message' : 'no id'
            }).status(403).end()
            return
        }

        let user1 = await User.findById(id1);
        let user2 = await User.findById(id2);
        
        if(!user1 || !user2) {
            res.json({
                'message' : 'Invalid id'
            }).status(403).end()
            return
        }
        console.log('worked1')
        if(!user1.friends.includes(id2) && !user2.friends.includes(id1)) {
            res.json({
                'message' : 'not friends'
            }).status(403).end()
            return
        }
        console.log('worked2')
        let updatedUser1 = await user1.updateOne({$pull : {friends:id2}})
        let updatedUser2 = await user2.updateOne({$pull : {friends:id1}})

        if(updatedUser1 && updatedUser2) {
            res.json({
                'message' : 'updated friends',
                'user' : updatedUser1,
            }).status(200).end()
        }
    } catch (error) {
        console.error(error);
        res.json({
            'message' : 'error',
        }).status(500).end()
    }
}