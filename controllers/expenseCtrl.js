var Expense = require("../models/expense").Expense;
var ExpenseType = require("../models/expense").ExpenseType

function saveExpense(req, res) {
	/*Expense.collection.insert(req.body, function(err, records){
		if(err) {
			res.send(err);
		} else {
			console.log('%d records inserted', records.length);
			res.send(records.ops);
		}
	});*/
	var userId = req.session.user._id;
	var orgId = req.session.user.org_id;
	req.body.user_id = userId;
	if (orgId) {
		req.body.org_id = orgId;
	}
	var expense = new Expense(req.body);
	expense.save(function(err, model) {
		if(err) {
			res.send(err);
		} else {
			res.send(model);
		}
	})
}

function getExpenses(req, res) {
	console.log(req.query)
	var sortBy = req.query.sortBy;
	var sortOrder = req.query.sortOrder
	var sort = {};
	if ( sortBy) {
		sort[sortBy] = sortOrder;
	}
	var searchBy = req.query.searchBy;
	var term = req.query.term;
	var search = {};
	if (searchBy) {
		search[searchBy] = term;
	}
	var dateSearch;
	if (req.query.dateFrom) {
		dateSearch = { $gte: req.query.dateFrom }
		if (req.query.dateTo) {
			dateSearch['$lte'] = req.query.dateTo;
		}
	}
	if (dateSearch) {
		search['exp_date'] = dateSearch;
	}
	/*if (req.query.from && req.query.to) {
		search['created_on'] = {
			$lte: new Date(Number(req.query.from)),
			$gte: new Date(Number(req.query.to))
		}
	}*/
	search['user_id'] = req.session.user._id;
	Expense.find(search, [], {sort: sort})
	.populate('typeId', 'title').
	exec(function(err, data) {
		if(err) {
			res.send(err);
		} else {
			res.send(data);
		}
	})
	/*Expense.find(
		search, [],
		{sort: sort},
		function(err, expenses) {
		// body...
		if(err){
			res.send(err);
		} else {
			res.send(expenses);
		}
	})*/
}

function updateExpense(req, res){
	console.log(req.body);
	var u_obj = {
		type : req.body.type,
		amount: req.body.amount,
		description: req.body.description,
		exp_date: req.body.exp_date
	}
	console.log(req.body);
	Expense.update({_id:req.body._id}, {$set:u_obj}, function(err){
		if(err){
			res.send(err);
		} else {
			res.send("updated successfully");
		}
	})
};

function removeExpense(req, res){
	console.log(req);
	Expense.findByIdAndRemove(req.body._id, function(err){
		err?res.send(err):res.send("item removed");
	});
}


function createType(req, res) {
	var exp = new ExpenseType(req.body);
	exp.save(function(err, records){
		if(err) {
			res.status(400).send(err);
		} else {
			console.log(' records inserted', records);
			res.send(records);
		}
	});
}

function getType(req, res) {
	var sortBy = req.query.sortBy;
	var sortOrder = req.query.sortOrder
	var sort = {};
	if ( sortBy) {
		sort[sortBy] = sortOrder;
	}
	ExpenseType.find({}, null,
		{sort: sort },
		function(err, expenses) {
		// body...
		if(err){
			res.send(err);
		} else {
			res.send(expenses);
		}
	})
}

module.exports = {
	saveExpense 	: saveExpense,
	getExpenses 	: getExpenses,
	updateExpense   : updateExpense,
	removeExpense   : removeExpense,
	createType      : createType,
	getType			: getType
}