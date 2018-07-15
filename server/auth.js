LocalStrategy = require('passport-local').Strategy;
const {credentials} = require('../config')
const ADMIN = "admin"

valid = (username, password) => username == credentials.user && password == credentials.password

passport.use(new LocalStrategy(
  (username, password, done) => {
		if (valid(username, password))
			done(null, ADMIN)
		else
			return done(null, false, { message: 'Usuario o contraseña incorrectas.' })
  }
))


passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((user, done) => {
  if (user == ADMIN)
    done(null, user)
  else
    done("Error de autenticación.")
})
