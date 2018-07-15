module.exports = {
  port: process.env.PORT || 8080,
  mongo: process.env.MONGODB_URI || 'mongodb://localhost:27017/webapp',
  prerenderToken: process.env.PRERENDER_TOKEN || "u8Gm4855NKyjGr0T72OQ",
  credentials: {
    user: process.env.CRED_USER || 'hola',
    password: process.env.CRED_PASS || 'chau'
  }
}
