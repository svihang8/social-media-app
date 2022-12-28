const mongoose = require('mongoose');
const { Schema } = mongoose;

const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new Schema({
    emailAddress : {
        type : String,
        require : true,
        validate : [isEmail, "Input is not valid email address"],
        unique : true,
    },
    password : {
        type : String,
        require : true,
    },
    firstName : {
        type : String,
        require : true,
        lowercase : true
    },
    lastName : {
        type : String,
        lowercase : true
    },
    profilePicture : {
        data : Buffer,
        contentType : String
    },
    isAdmin : {
        data : Boolean,
        default : false,
    }
  });

const User  = mongoose.model('User', userSchema)

module.exports = User