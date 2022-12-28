const User = require("../models/User");
const bcrypt = require('bcrypt');


exports.encryptPassword = async (req, res, next) => {
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
        next();
    } catch (error) {
        console.error(error);
        res.json({
            'message' : 'error',
        }).status(500).end()
    }
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

    const user = await User.findOne({emailAddress : emailAddress});

    if(user) {
        const valid = await bcrypt.compare(password, user.password)
        if(valid) {
            res.json({
                'message' : 'success',
            }).status(200).end()
        }
        res.json({
            'message' : 'invalid password',
        }).status(403).end()
    }
    res.json({
        'message' : 'invalid email',
    }).status(403).end()
    
}