var express = require('express');
var router = express.Router();
var employee = require('../controllers/employeeCtrl');

/* GET home page. */
router.post('/save', employee.saveEmployee);

router.get('/get', employee.getEmployees);


module.exports = router;
