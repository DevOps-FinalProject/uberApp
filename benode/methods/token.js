const jwt = require('jsonwebtoken');
const config = require('config');
const winston = require('winston');

exports.genToken = (userId) => {
    const token = jwt.sign({ _id: userId }, config.get('jwtPrivateKey'));
    return token;
};
