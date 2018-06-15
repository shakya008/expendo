// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var valid = require('./validators');

// create a schema
var userSchema = new Schema({
  typeId: { type: Schema.Types.ObjectId, ref: 'ExpenseType', validate: [valid.emptyCheck], required: [true, 'required'] },
  description: { type: String, validate: [valid.emptyCheck], required: [true, 'required']},
  amount: { type: Number, validate: [valid.isDefined], required: [true,'required']},
  exp_date: { type: Number, validate: [valid.isDefined], required: [true, 'required']},
  expand_by: {type: Schema.Types.ObjectId},
  user_id: {type: Schema.Types.ObjectId},
  org_id: {type: Schema.Types.ObjectId},
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var Expense = mongoose.model('Expense', userSchema);

// make this available to our users in our Node applications

var typeSchema = new Schema({
  title: { type: String, validate: [valid.emptyCheck, 'value required'],
          required: [true, 'title required']},
active : {type: Boolean, default: true},
created_on: { type: Date, default: Date.now },
updated_on: { type: Date, default: Date.now }
});


var ExpenseType = mongoose.model('ExpenseType', typeSchema);
module.exports = {
  Expense: Expense,
  ExpenseType: ExpenseType
}