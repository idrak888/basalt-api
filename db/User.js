const {mongoose} = require('./mongoose');

const User = mongoose.model('User', {
    _id: String,
	username: { type: String, unique: false },
	bio: String,
	profile_pic: String,
	email: { type: String, unique: true },
	skills: Array,
	projects: Array
});

module.exports = {
	User
}
