const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require('../config/default.json');

module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: './logs/uncaughtExceptions.log' }));
    process.on('unhandledRejection', (ex => {
        throw ex;
    }));

    winston.add(
        new winston.transports.File({ filename: './logs/application.log' }));
    winston.add(new winston.transports.MongoDB({
        db: config.dbUrl,
        options: { useUnifiedTopology: true },
        level: 'error'
    }));
}