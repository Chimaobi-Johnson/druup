const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');

const router = express.Router();

router.post('/api/login', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	User.findOne({ email })
	.then(user => {
		if(!user) {
			const error = new Error('User with this email could not be found');
			error.statusCode = 401;
			throw error;
		}
		loadedUser = user;
		return bcrypt.compare(password, user.password)
	})
	.then(isEqual => {
		if(!isEqual) {
		const error = new Error('wrong password');
		error.statusCode = 401;
		throw error;
	 }

	 const token = jwt.sign({
		 email: loadedUser.email,
		 userId: loadedUser._id.toString()
	 },
	 keys.cookieKey,
	 { expiresIn: '1h' }
	 );

	 res.status(200).json({ userName: loadedUser.username, userId: loadedUser._id, token: token })

	})
	.catch(err => {
		console.log(err);
		const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
	})
})

router.post('/api/register', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	bcrypt.hash(password, 12).then(hashedPw => {
		const user = new User({
			email: email,
			password: hashedPw
		});
	  return user.save()
	})
	.then(user => {
		res.status(201).json({ user });
	})
	.catch(err => {
		let statusCode = 500;
		if(err.errors.email.kind === "unique") {
			err.errors.email.message = "Email already exists!";
			statusCode = 409;
		}
		const error = new Error(err);
    error.httpStatusCode = statusCode;
    return next(error);
	})

})

router.post('/api/register/addusername', (req, res, next) => {
	const userName = req.body.userName;
	const userId = req.body.userId;
	User.findById(userId)
	.then(user => {
		user.username = userName;
		return user.save();
	})
	.then(updatedUser => {

			 const token = jwt.sign({
				 email: updatedUser.email,
				 userId: updatedUser._id.toString()
			 },
			 'djfindsnfl_sjfe=sdvosnvw=-sf9348yhv87h374i2',
			 { expiresIn: '1h' }
			 );

		res.status(200).json({ userName: updatedUser.username, userId: updatedUser._id, token: token })
	})
	.catch(err => {
		console.log(err);
		const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
	})
})

module.exports = router;
