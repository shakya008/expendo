// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
  title: String,
  description: String,
  category: String,
  stock: Number,
  price: Number,
  added_on: { type: Date, default: Date.now },
  modified_on: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('Product', productSchema);
