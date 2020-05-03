const {mongoose} = require('./mongoose');

const User = mongoose.model('User', {
    _id: String,
	username: { type: String, unique: true },
	bio: String,
	email: String,
	skills: Array,
	projects: Array
});

module.exports = {
	User
}