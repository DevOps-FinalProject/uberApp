const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('config');

router.post('/', async (req, res) => {
    const userId = req.body.userId;
    const userRole = req.body.userRole;
    const token = jwt.sign({ userId: userId, userRole: userRole }, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send('Login Successful');
});

module.exports = router;