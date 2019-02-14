const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config()
const session = require('./session')
const logger = require('./logger')
const config = require('./config')
const notify = require('./notify');

const app = express();

app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(session);


if (!config.isProd) {
  app.use(errorhandler());
}

mongoose.connect(
  config.mongoUrl,
  { useCreateIndex: true, useNewUrlParser: true }
).then(
  () => logger.info('Connected mongo'),
  err => logger.info(`Connect mongo has error ${err}`)
)

require('./users');
require('./lottery-time');
require('./block');
require('./lottery');
require('./jwt/passport');
app.use('/api/v1', require('./router'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//development handle error will print stacktrace
if(!config.isProd){
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


var server = app.listen(config.port, err => {
  if (err) throw err
  logger.info(`> Ready on ${config.apiUrl}`)
  notify.init(server)
});
