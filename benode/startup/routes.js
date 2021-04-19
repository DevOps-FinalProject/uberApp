const express = require('express');
const users = require('../routes/users');
const error = require('../middleware/error');
const auth = require('../routes/auth');

module.exports = function(app) {
    app.use(express.json());
    app.use('/user', users);
    app.use('/auth', auth);
    app.use(error);
}