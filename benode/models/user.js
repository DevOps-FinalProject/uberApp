const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');
const validatePhoneNum = Joi.extend(require('joi-phone-number'));
const jwt = require('jsonwebtoken');
const config = require('config');
const winston = require('winston');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    userRole: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true
    }
});

// userSchema.methods.generateAuthToken = function() {
//     const token = jwt.sign({ _id: this.id }, config.get('jwtPrivateKey'));
//     // this is for testing purpose only
//     winston.info(`${this.email}: ${token}`);
//     return token;
// }

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const complexityOptions = {
        min: 7,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 6
    };

    const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        phone: Joi.number().min(1000000000).required(),
        email: Joi.string().min(5).email().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
        password: passwordComplexity(complexityOptions).required(),
        userRole: Joi.string().min(3).max(15).required(),
    });
    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;