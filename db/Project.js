const {mongoose} = require('./mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    teamName: String,
    teamCode: String,
    members: Array,
    creationDate: String,
    activeBugs: Array,
    fixedBugs: Array
});

const ProjectModel = mongoose.model('ProjectModel', ProjectSchema);

module.exports = {
	ProjectModel
}