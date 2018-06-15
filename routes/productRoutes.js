var express = require('express');
var router = express.Router();
var product = require('../controllers/productCtrl');

/* GET home page. */
router.post('/add', product.addProduct);

router.get('/get', product.getProducts);


module.exports = router;
