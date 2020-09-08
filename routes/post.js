const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const requireLogin = require('../middleware/requireLogin');

router.get('/allpost', (req, res) => {
    Post.find()
        //para sólo obtener el _id y el name del objeto de postedBy
        .populate('postedBy', "_id name")
        .populate('comments.postedBy', '_id name')
        .then(posts => {
            res.status(200).json({
                posts
            })
        })
        .catch(err => console.log(err))
})

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body;
    if(!title || !body || !pic){
        return res.status(422).json({
            error: 'Please add all the fields'
        });
    }
    // para remover la contraseña del req.body -> postedBy
    req.user.password = undefined;

    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    });

    post.save()
        .then(result => {
            res.status(200).json({
                post: result
            })
        })
        .catch(error => console.log(error))

})

router.get('/mypost', requireLogin,(req, res) => {
    Post.find({
        postedBy: req.user._id
    }).populate('postedBy', '_id name')
        .then(mypost => {
            res.status(200).json({
                mypost
            })
        })
        .catch(error => console.log(error))
})

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {
            likes: req.user._id
        }
    },
    {
        new: true
    }).exec((error, result) => {
        if(error){
            return res.status(422).json({
                error
            })
        }else{
            res.json(result)
        }
    })
})

router.post('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {
            likes: req.user._id
        }
    },
    {
        new: true
    }).exec((error, result) => {
        if(error){
            return res.status(422).json({
                error
            })
        }else{
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {
            comments: comment
        }
    },
    {
        new: true
    })
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((error, result) => {
        if(error){
            return res.status(422).json({
                error
            })
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({_id:req.params.postId})
    .populate('postedBy', '_id')
    .exec((error, post) => {
        if(!post){
            return res.status(422).json({
                error: error
            })
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json(result)
            }).catch(error => console.log(error))
        }
    })
})

module.exports = router;