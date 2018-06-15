// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var employeeSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone_no: Number,
  active: {type: Boolean, default: true},
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('Employee', employeeSchema);
