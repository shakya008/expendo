var RegistrationSchema = require("../models/registration");
//var schema = mangoose.model('Registration');
function registerUser (req, res) {
	console.log("got the request");
	var newSchema = new RegistrationSchema(req.body);
	newSchema.save(function(err, model) {
		console.log(model);
		if(err){
			console.log(err);
			res.send(err);
		} else {
			console.log("stored in db successfully!!");
			res.send(model);
		}
	});
};

function getRegisteredUser(req, res) {
	var searchParam = {};
	//console.log(req.query);
	RegistrationSchema.find(req.query,function(err, users){
		if(err){
			console.log(err);
		} else {
			console.log(users);
			res.send(users);
		}
	});
}


function login(req, res) {
	RegistrationSchema.findOne({'email': req.query.email}, function (err, user) {
		if (user) {
			req.session.user = user;
		}
		// body...
		if( err) {
			res.send(err);
		} else {
			res.send(user);
		}
	})
}

function logout(req, res) {
	req.session.destroy(function(err) {
		if( err) {
			res.send(err);
		} else {
			res.send({msg: 'logged out succesfully'});
		}
	})
}
function getCurrentUser() {

}

module.exports = {
	registerUser : registerUser,
	getRegisteredUser : getRegisteredUser,
	login: login,
	logout: logout,
	getCurrentUser: getCurrentUser
};