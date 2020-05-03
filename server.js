const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { User } = require('./db/User');
 
const app = express();
var port = process.env.PORT || 3100;

const pathToPublic = path.join(__dirname, './public');
app.use(express.static(pathToPublic));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "X-Auth");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

app.use(bodyParser.json());

app.get("/users", (req, res) => {
	User.find().then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

app.get("/users/:id", (req, res) => {
	var _id = req.params.id;
 
	User.find({_id}).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.post("/users", (req, res) => {
	var NewUser = new User({
        _id: req.body.uid,
		username: req.body.username,
		bio: req.body.bio,
		email: req.body.email,
		skills: req.body.skills,
		projects: []
	});

	NewUser.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});