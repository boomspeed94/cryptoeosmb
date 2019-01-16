var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
var cors = require('cors');

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'cryptoeosmb',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false
}));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  console.log("connect to mongodb");
  // mongoose.connect('mongodb://localhost:27017/lotto');
  mongoose.connect('mongodb://localhost:27017/cryptoeosmbdb', {
     useCreateIndex: true,
     useNewUrlParser: true });
  mongoose.set('debug', true);
}

require('./components/users/user');
require('./config/passport');

app.use(require('./app'));


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//development handle error will print stacktrace
if(!isProduction){
  app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

//production handle error will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port: ' + server.address().port);
});
