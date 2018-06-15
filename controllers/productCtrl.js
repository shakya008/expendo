var Product = require("../models/product");

function addProduct(req, res) {
	var product = new Product(req.body);
	product.save(function(err, model) {
		if(err) {
			res.send(err);
		} else {
			res.send(model);
		}
	});
}

function getProducts(req, res) {
	Product.find(function(err, result){
		if (err){
			res.send(err)
		} else {
			res.send(result);
		}
	});
}

module.exports = {
	addProduct	: addProduct,
	getProducts	: getProducts
}