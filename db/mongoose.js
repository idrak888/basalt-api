const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://idrak:admin012@ds151450.mlab.com:51450/basalt-api');

module.exports = {
	mongoose
}