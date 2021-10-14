var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
var _handlebars = require('handlebars')
var helpers = require('handlebars-helpers')({
  handlebars : _handlebars
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var cityRouter = require('./routes/city');
var stateRouter = require('./routes/state');
var areaRouter = require('./routes/area');
var adminRouter = require('./routes/admin');
var subcategoryRouter = require('./routes/subcategory');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars',exphbs({
  defaultLayout : false,
  handlebars: allowInsecurePrototypeAccess(_handlebars),
  "helpers" : helpers
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard cat', cookie: {maxAge : 60000}}));
app.use(fileUpload());


app.use('/', indexRouter);
app.use('/admin/user', usersRouter);
app.use('/admin',adminRouter);
app.use('/admin/product',productRouter);
app.use('/admin/category',categoryRouter);
app.use('/admin/city',cityRouter);
app.use('/admin/state',stateRouter);
app.use('/admin/area',areaRouter);
app.use('/admin/subcategory',subcategoryRouter);

//Db Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://Adminltedb:Adminltedb@localhost:27017/Adminltedb")
.then(() => console.log("Connected Successfully"))
.catch((err) => console.log(err))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
