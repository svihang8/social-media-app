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
                message : 'couldn\'t delete user',
            })
        }            
    } catch (error) {
        console.error(error);
        res.json({
            message : 'error',
        });
    }

}