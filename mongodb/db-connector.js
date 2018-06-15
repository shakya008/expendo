var mongoose = require('mongoose');
var conf = require("../config/config");

var db_Connection;
function connect_db(db) {
	db = db || 'app1';
	var dbPath = conf.DB_URL + '/' + db;
	db_Connection = mongoose.connect(dbPath, {}, function(err) {
  // body...
  if(err){
  	console.log("Could not connect to monogoDB");
  	console.log(err);
  } else {
  	mongoose.set("debug", "false");
  	console.log("Connected to MongoDB: %s", db);
  	// disconnect_db();
  }
});
}

function disconnect_db() {
	db_Connection.disconnect();
}

module.exports = {
	connect_db 		: connect_db,
	disconnect_db	: disconnect_db
	}