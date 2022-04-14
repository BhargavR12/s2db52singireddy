var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

const connectionString =process.env.MONGO_CON;
console.log(connectionString);
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var houseRouter = require('./routes/house');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var house = require("./models/house");
var resourceRouter = require('./routes/resource');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/house', houseRouter);
app.use('/addmods', addmodsRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.messLocation = err.messLocation;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error pLocation
  res.status(err.status || 500);
  res.render('error');
});
async function recreateDB(){
  // Delete everything
  await house.deleteMany();
 
  let instance1 = new house({House_name:"Singireddy Mansion", Location:"Ammakkapet", House_number:"59"});
  instance1.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("First object saved")
  });
 
 let instance2 = new house({House_name:"Baddam Mansion", Location:"Uploor", House_number:"45"});
  instance2.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("Second object saved")
  });
 
  let instance3 = new house({House_name:"Laxmi Mansion", Location:"Nizambad", House_number:"34"});
  instance3.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("Third object saved")
  });
 }

 let reseed = true;
 if(reseed){recreateDB()};

module.exports = app;
