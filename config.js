module.exports = {
  port: process.env.PORT || 8080,
  mongo: process.env.MONGODB_URI || 'mongodb://heroku_m6g9l2nt:is8trf9e5t6csdc25sb942err1@ds153890.mlab.com:53890/heroku_m6g9l2nt' || 'mongodb://localhost:27017/kiwi-bot',
  prerenderToken: process.env.PRERENDER_TOKEN || "u8Gm4855NKyjGr0T72OQ",
  credentials: {
    user: process.env.CRED_USER || 'hola',
    password: process.env.CRED_PASS || 'chau'
  }
}
