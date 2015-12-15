//Configure environment, which is set in server.js
module.exports = require('./env/' + process.env.NODE_ENV + '.js');