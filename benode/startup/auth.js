const config = require('config');
const winston = require('winston');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }
}