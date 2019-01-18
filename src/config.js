const isProd = process.env.NODE_ENV === 'PRODUCTION'
const port = process.env.PORT || 3000
const clientPort = process.env.CLIENT_PORT || 3000

module.exports = {
  isProd,
  port,
  apiUrl: isProd ? process.env.API_URL : `http://localhost:${port}`,
  clientUrl: isProd ? process.env.CLIENT_URL : `http://localhost:${clientPort}`,
  mongoUrl: isProd
    ? process.env.MONGO_URL
    : (process.env.MONGO_URL_DEV || 'mongodb://localhost:27017/cryptoeosmbdb'),
  session: {
    name: process.env.SESSION_NAME || 'cryptoeosmb-session',
    secret: process.env.SESSION_SECRET || 'cryptoeosmb-session-secret'
  }
}
