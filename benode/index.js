const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/auth')();
require('./cors')(app)
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

// console.log('key: ' + process.env.uber_jwtPrivateKey);

// const port = process.env.PORT || 4000;
app.listen(4000, () => winston.info(`Listening on port 4000...`));