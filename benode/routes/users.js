const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require("bcrypt");
const _ = require('lodash');
const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const { genToken } = require('../methods/token');
const { json } = require('express');

// get all registered user details
router.get('/getDetails', async(req, res) => {
    const users = await User.find().sort('firstName');
    res.send(users);
});

// get self user details
router.get('/self', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// get single user details based on email
router.get('/getDetails/:email', auth, async(req, res) => {
    
    const valEmail = await validateEmail(req.params.email);
    if (!valEmail) return res.status(400).send("Kindly provide valid email id");

    const users = await User.find({ email: req.params.email });
    if (users.length == 0) return res.status(401).send("User with the given email id is not present in the system");
    if (users.length > 1) return res.status(401).send("Multiple users are present with the given email id in the system");
    const user = await User.findById(users[0].id)
    
    if (req.user._id !== user._id.toString()) return res.status(401).send('Access Denied. Invalid token.');
    res.send(user);
});

// save the user details in db
router.post('/register', async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(401)
        .send('An existing user is already present with the ' +
            'given email id. Kindly provide different email.');

    existingUser = await User.findOne({ phone: req.body.phone });
    if (existingUser) return res.status(401)
        .send('An existing user is already present with the ' +
            'given phone number. Kindly provide different phone number.');

    let user = new User(_.pick(req.body, ['firstName', 'lastName', 'phone', 'email', 'password', 'userRole']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    res
        // .header('x-auth-token', token)
        .send(_.pick(user, ['_id', 'firstName', 'lastName', 'phone', 'email']));
});

// update user details
router.put('/profile/:userId', async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.userId, {
        $set: _.pick(req.body, ['firstName', 'lastName', 'phone', 'email'])
    }, {
        new: true,
        useFindAndModify: false
    });

    if (!user) return res.status(401).send('User not found');
    return res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'phone', 'email']));
    // return res.status(204).send('The user updated successfully');
    // return res.send(user);
});


// validate user login
router.post('/login', async(req, res) => {
    const valEmail = await validateEmail(req.body.email);
    if (!valEmail) return res.status(400).send("Kindly provide valid email id");
    const users = await User.find({ email: req.body.email });
    if (users.length == 0) return res.status(401).send("User with the given email id is not present in the system");
    if (users.length > 1) return res.status(401).send("Multiple users are present with the given email id in the system");
    const user = await User.findById(users[0].id);

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    //send user details

    if (!isPasswordValid) return res.status(400).send("Login failed. Provided email and password do not match.");

    // else return res.send(_.pick(user, ['firstName', 'lastName', 'phone', 'email']));
    else {
        const token = await genToken(user._id);
        res.setHeader('x-auth-token', token);
        return res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'phone', 'email','userRole']));
    }
});


router.post('/authToken', async(req, res) => {
    const token = req.body.token;
    console.log("Python "+token)
    if (!token) return res.status(401).send('Access Denied. No token provided');
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // req.user = decoded;
        // next();
        res.send("Validated")
    } catch (error) {
        res.status(400).send('Invalid token.')
    }
});

function validateEmail(paramEmail) {
    const schema = Joi.object().keys({
        email: Joi.string().min(5).email().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required()
    });

    return schema.validate({ email: paramEmail }, function(err, result) {
        if (err) return null;
        else return paramEmail;
    });

}

module.exports = router;