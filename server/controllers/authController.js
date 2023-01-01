const User = require("../models/User");
const bcrypt = require('bcrypt');


exports.encryptPassword = async (req, res, next) => {
    if(!res.locals.skipFunc) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            console.log(`hash : \t${hash}}`);
            if(!hash) {
                res.json({
                    'message' : 'password encryption error',
                }).status(500).end()        
            }
            res.locals.hashedPassword = hash;
        } catch (error) {
            console.error(error);
            res.json({
                'message' : 'error',
            }).status(500).end()
        }        
    }
    next()
}

exports.signUp = async (req, res, next) => {
    try {
        console.log(`hashedpassword : \t${res.locals.hashedPassword}`);
        let newUserData = {...req.body}
        newUserData.password = res.locals.hashedPassword
        console.log(`newUserData : \t${JSON.stringify(newUserData)}`);
        const newUser = await User.create(newUserData);
        if(!newUser) {
            res.json({
                'message' : 'data invalid',
            }).status(400).end()
        }
        res.json({
            'message' : 'success',
            'newUser' : newUser,
        }).status(200)        
    } catch (error) {
        console.error(error);
        res.json({
            message : 'error'
        }).status(500)
    }
}

exports.login = async (req, res, next) => {
    const {emailAddress, password} = req.body

    try {
        const user = await User.findOne({emailAddress : emailAddress});

        if(!user) {
            res.json({
                'message' : 'invalid email',
            }).status(403).end()      
        } else {
            const valid = await bcrypt.compare(password, user.password)
            if(!valid) {
                res.json({
                    'message' : 'invalid password',
                }).status(403).end()  
            } else {
                res.json({
                    'message' : 'success',
                }).status(200).end();    
            }
        }
    } catch(error) {
        console.error(error);
        res.json({
            'message' : 'error',
        }).status(500).end()
    }
}