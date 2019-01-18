const winston = require('winston')
const config = require('./config')

const logger = winston.createLogger({
  format: winston.format.simple(),
  level: config.isProd ? 'info' : 'debug',
  transports: [new winston.transports.Console()]
})

module.exports = logger
