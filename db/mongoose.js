const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin109:109admin@ds259001.mlab.com:59001/basalt-api');

module.exports = {
	mongoose
}