var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var conf        = require("./config/config");
var session = require('express-session');
var MongoStore = require('express-sessions');
var mongoose = require('mongoose');

var db = require('./mongodb/db-connector');

var routes  = require('./routes/index');
var users   = require('./routes/users');
var route   = require('./routes/route');
var expenseRoute  = require('./routes/expenseRoutes');
var employeeRoute = require('./routes/employeeRoutes');
var productRoute  = require('./routes/productRoutes');
var registrationRoute = require('./routes/registrationRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//  app.set('view engine', 'jade');*/
//app.engine('html', require('ejs').renderFile);
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'webapp')));
app.use(session({
  key: 'Node.App',
  secret: 'Secre7',
  store: new MongoStore({
    db: 'app1',
    storage: 'mongodb',
    instance: mongoose, // optional 
    host: 'localhost', // optional 
    port: 27017, // optional 
    collection: 'sessions', // optional 
  })
}))

/* 
dynamically include routes (Controller)
http://timstermatic.github.io/blog/2013/08/17/a-simple-mvc-framework-with-node-and-express/
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});
*/
// MongoDB
//https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton
/*var mongoose = require('mongoose');
mongoose.connect(conf.DB_URL, {}, function(err) {
  // body...
  if(err){
    console.log("Could not connect to monogoDB");
    console.log(err);  
  } else {
    mongoose.set("debug", "false");
    console.log("Connected to MongoDB");
  }
});*/
db.connect_db('app1');
// Make our db accessible to our router
app.use(function(req,res,next){
    next();
});

app.use('/', routes);
app.use('/users', users);
//app.use('/rest/api', route);
app.use('/rest/api/expenses', expenseRoute);
app.use('/rest/api/employee', employeeRoute);
app.use('/rest/api/product', productRoute);
app.use('/rest/api/registration', registrationRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
res.send(err);
});
app.listen(5000);


module.exports = app;
