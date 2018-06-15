function sessionCheck(req, res, next) {
	if (!req.session.user) {
		res.send({'msg': 'Invalid session'});
	}
	next();
}

module.exports = {
	sessionCheck: sessionCheck
}