const mongoose = require('mongoose');
const { Schema } = mongoose;

const { default: isEmail } = require('validator/lib/isEmail');

const postSchema = new Schema({
    emailAddress : {
        type : String,
        require : true,
        validate : [isEmail, "Input is not valid email address"],
        unique : true,
    },
    description : {
        type : String, 
        max : 500,
    },
    likes : {
        type : [],
        default : []
    }
  });

const Post  = mongoose.model('Post', postSchema);

module.exports = Post