const cors = require("cors")

const corsOptions = {
    exposedHeaders: 'x-auth-token',
};

module.exports = function(app) {
    // app.use(cors());
    app.use(cors(corsOptions));
}