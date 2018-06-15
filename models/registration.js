// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  passwd: { type: String, required: true },
  indivisual: {type: Boolean, required: true },
  org_id: {type: Schema.Types.ObjectId, default: null },
  created_at: Date,
  updated_at: Date
});

/*
*
*/
userSchema.static.findByEmail = function(email, cb) {
  return this.find({email:new RegExp(email, 'i') }, cb)
};
userSchema.static.queryRegisteredOwner = function(data, cb) {
  return this.find(cb);
}


// the schema is useless so far
// we need to create a model using it
var Registration = mongoose.model('Registration', userSchema);

// make this available to our users in our Node applications
module.exports = Registration;