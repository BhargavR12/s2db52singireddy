var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");

passport.use(new LocalStrategy( 
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
    }); 
  } ));

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
app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/house', houseRouter);
app.use('/addmods', addmodsRouter);
app.use('/resource', resourceRouter);

// passport config 
// Use the existing connection 
// The Account model  
var Account =require('./models/account'); 
 
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 

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
