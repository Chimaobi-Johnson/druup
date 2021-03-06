const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/api/comment', (req, res, next) => {
   const commentValue = req.body.text;
   const userId = req.body.userId;
   User.findById(userId)
   .then(user => {
     if(!user) {
       const error = new Error("Error user not found. may have been deleted.");
       error.httpStatusCode = 404;
       throw error;
     }
     user.comments.push(commentValue);
     return user.save();
   })
   .then(savedUser => {
     res.status(200).json({ message: "Message sent to user" });
   })
   .catch(err => {
     console.log(err);
     const error = new Error(err);
     error.httpStatusCode = 500;
     return next(error);
   });
})

router.post('/api/comments', (req, res, next) => {
  const userId = req.body.userId;
   User.findById(userId)
   .then(user => {
     if(!user) {
       const error = new Error("Error user not found. may have been deleted.");
       error.httpStatusCode = 404;
       throw error;
     }
     res.status(200).json({ comments: user.comments });
   })
   .catch(err => {
     console.log(err);
     const error = new Error(err);
     error.httpStatusCode = 500;
     return next(error);
   });
})

router.post('/api/user', (req, res, next) => {
  const userId = req.body.userId;
   User.findById(userId)
   .then(user => {
     if(!user) {
       const error = new Error("Error user not found. may have been deleted.");
       error.httpStatusCode = 404;
       throw error;
     }
     res.status(200).json({ username: user.username });
   })
   .catch(err => {
     console.log(err);
     const error = new Error(err);
     error.httpStatusCode = 500;
     return next(error);
   });
})


module.exports = router;
