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

//get all users
app.get("/users", (req, res) => {
	User.find().then(doc => {
        res.send(doc);
    }).catch(e => {
		res.send(e);
	});
});

//get user by _id
app.get("/users/:id", (req, res) => {
	var _id = req.params.id;
 
	User.find({_id}).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

//post new user (sign up)
app.post("/users", (req, res) => {
	var NewUser = new User({
        _id: req.body.uid,
		username: req.body.username,
		bio: "",
		profile_pic: "",
		email: req.body.email,
		skills: [],
		projects: []
	});

	NewUser.save().then((doc) => {
		res.send(doc);
	}).catch(e => {
        res.send(e);
    });
});

//update user profile picture
app.post("/user/update/profile_pic/:id", (req, res) => {
	var _id = req.params.id;
	
	User.findOneAndUpdate({ _id }, { profile_pic: req.body.profile_pic }).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

//update user bio
app.post("/user/update/bio/:id", (req, res) => {
	var _id = req.params.id;
	
	User.findOneAndUpdate({ _id }, { bio: req.body.bio }).then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

//update user skills 
app.post("/user/update/skills/:id", (req, res) => {
	var _id = req.params.id;
	var new_skill = req.body.skill;

	User.find({_id}).then(doc => {
		if (doc[0].skills.includes(new_skill)) {
			User.findOneAndUpdate({ _id }, { $pull: { skills: new_skill } }).then(doc => {
				res.send(doc);
			}).catch(e => {
				res.send(e);
			});
		} else {
			User.findOneAndUpdate({ _id }, { $push: { skills: req.body.skill } }).then(doc => {
				res.send(doc);
			}).catch(e => {
				res.send(e);
			});
		}
	});
});

//delete user by _id
app.delete("/users/:id", (req, res) => {
	var _id = req.params.id;

	User.find({_id}).remove().then(doc => {
		res.send(doc);
	}).catch(e => {
		res.send(e);
	});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});