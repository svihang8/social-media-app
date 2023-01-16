const Post = require('../models/Post');


exports.createPost = async (req, res) => {
    const newPostData = req.body;
    try {
        const newPost = await Post.create(newPostData);
        if(!newPost) {
            res.json({
                'message' : 'data invalid',
            }).status(400).end()
        }
        res.json({
            'message' : 'success',
            'newPost' : newPost,
        }).status(200) 
    } catch (error) {
        console.error(error);
        res.json({
            message : 'error'
        }).status(500)        
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        let data = req.body;
        const post = await Post.findByIdAndUpdate(id, data, {new : true});

        if(post) {
            res.json({
                'message' : 'success',
                'post' : post,
            }).status(200).end()
        } else {
            res.json({
                'message' : 'couldn\'t update post'
            }).status(403).end()
        }
    } catch (error) {
        console.error(error);
        res.json({
            'message' : error
        }).status(500).end()
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await Post.findByIdAndDelete(id);
    
        if(post) {
            res.json({
                'post' : post,
            })
        } else {
            res.json({
                'message' : 'couldn\'t delete post',
            })
        }            
    } catch (error) {
        console.error(error);
        res.json({
            'message' : 'error',
        });
    }

}

exports.getPost = async (req, res, next) => {
    try {
        const id = req.params.id
        if(id) {
            const post = await Post.findById(id);
            if(post) {
                res.json({
                    'post' : post,
                })
            } else {
                res.json({
                    message : 'post with id not found'
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