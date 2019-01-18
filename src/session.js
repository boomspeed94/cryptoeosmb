const session = require('express-session')
const mongoSessionStore = require('connect-mongo')
const mongoose = require('mongoose')

const config = require('./config')
const options = getSessionStoreOptions()

module.exports = session(options)

function getSessionStoreOptions () {
  const MongoStore = mongoSessionStore(session)
  const sessionOptions = {
    name: config.session.name,
    secret: config.session.secret,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
      domain: config.isProd ? 'localhost' : 'localhost',
      secure: config.isProd
    }
  }
  return sessionOptions
}
