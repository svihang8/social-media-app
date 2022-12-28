const User = require('../models/User');
/*
Retrieve user information of all
*/
exports.getUsers = async (req, res, next) => {
    try {
        const listofUsers = await User.find()
        if(listofUsers) {
            res.json({
                message : 'No users found',
            })
        } else {
            res.json({
                message : 'users found', 
                users : listofUsers,
            })
        }
    } catch(error) {
        console.error(error);
        res.json({
            message : 'error'
        }).status(500)
    }
}

/*
Retrieve user information by object id
*/
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
            message : 'error'
        })
    }
}

/*
Create new user
*/
exports.createUser = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await User.create({
            emailAddress : data.emailAddress,
            password : data.password,
            firstName : data.firstName,
            lastName : data.lastName,
            profilePicture : data.profilePicture
        })

    } catch (error) {
        
    }
}

/*
Update user by id
*/
exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await User.findByIdAndUpdate(id, data, {new : true});

        if(user) {
            res.json({
                user : user,
            })
        } else {
            res.json({
                message : 'couldn\'t update user'
            })
        }
    } catch (error) {
        console.error(error);
        res.json({
            message : error
        }).status(500)
    }
}

/*
Delete user by index
*/
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