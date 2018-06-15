var express = require('express');
var router = express.Router();
var registration = require('../controllers/registration');

/* GET home page. */
router.post('/register', registration.registerUser);

router.get('/get', registration.getRegisteredUser);

router.get('/login', registration.login);
router.get('/logout', registration.logout);

module.exports = router;
