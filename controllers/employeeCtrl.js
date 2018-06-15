var Employee = require("../models/employee");

function saveEmployee(req, res) {
	var employee = new Employee(req.body);
	employee.save(function(err, model) {
		if(err) {
			res.send(err);
		} else {
			res.send(model);
		}
	});
}

function getEmployees(req, res) {
	Employee.find(function(err, result){
		if (err){
			res.send(err)
		} else {
			res.send(result);
		}
	});
}

module.exports = {
	saveEmployee	: saveEmployee,
	getEmployees	: getEmployees
}