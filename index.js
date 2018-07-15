require('./globals')
express = require('express')
request = require('request')
session = require('express-session')
passport = require('passport')
bodyParser = require('body-parser')
config = require('./config')
const {authMiddleware} = require('./server/utils')

app = express()
app.use(session({ secret: "muebles", resave: false, saveUninitialized: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(require('prerender-node').set('prerenderToken', config.prerenderToken).set('forwardHeaders', true))

require("./server/auth")

// ---- API
app.use("/api", require("./server/api"))
// ----

// ---- APP client
path = __dirname
app.set("views", path)
app.use(express.static(path))
app.set("appPath", path)

app.get('/', (req, res) => res.sendFile(path + "/main.html", {cacheControl: false}))
app.get('/admin', authMiddleware, (req, res) => res.sendFile(path + "/admin.html"))

app.get('/login', (req, res) => res.sendFile(path + "/login.html"))
app.post('/login',
  passport.authenticate('local',
    { successRedirect: '/admin',
      failureRedirect: '/login',
      session: true
    }))
// ----

// ---- PING
app.get('/ping', (req, res) => res.send("pong"))
// ----

port = config.port
app.listen(port, () => console.log(`Listen port ${port}`))
