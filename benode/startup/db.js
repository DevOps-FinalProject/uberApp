const winston = require('winston');
const mongoose = require('mongoose');
const config = require('../config/default.json')

module.exports = function() {
    mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => winston.info('Connected to MongoDB...'));
}