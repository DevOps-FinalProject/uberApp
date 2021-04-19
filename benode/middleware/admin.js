module.exports = function(req, res, next) {
    if (req.user.userRole !== 'admin') return res.status(403).send('Access Denied');
    next();
}