const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const requireLogin = require('../middleware/requireLogin');
const User = mongoose.model('User');

router.get('/user/:id', requireLogin, (req, res) => {
    User.findOne({_id:req.params.id})
    .select('-password')
    .then(user => {
        Post.find({postedBy:req.params.id})
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
            if(err){
                return res.status(422).json({
                    error: err
                })
            }
            res.json({
                user, posts
            })
        })
    }).catch(error => {
        return res.status(404).json({
            error: 'user not found'
        })
    })
})

// router.put('/follow', requireLogin, (req, res) => {
//     User.findByIdAndUpdate(req.body.followId, {
//         $push: {
//             followers: req.user._id
//         }
//     })
// })

module.exports = router;