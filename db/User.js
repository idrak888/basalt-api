const {mongoose} = require('./mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	_id: { type: String, unique: true },
	username: String,
	bio: String,
	profile_pic: String,
	email: String,
	skills: Array,
	projects: Array
});

const User = mongoose.model('User', UserSchema);

module.exports = {
	User
}