
import express from 'express'
import helmet from 'helmet'

import router from './routes/router.js'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'

dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(express.static('public'))
app.use(express.static('https://gitlab.lnu.se'))

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': ["'self'"],
        'script-src': ["'self'", 'https://gitlab.lnu.se', 'cdn.jsdelivr.net'],
        'img-src': ["'self'", 'https://gitlab.lnu.se', '*.gravatar.com', 'cdn.jsdelivr.net']
      }
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false
  })
)

app.use((err, req, res, next) => {
  err.status = err.status || 500

  res.status(err.status).json({
    status: err.status,
    message: err.message
  })
  console.log('Server', err.message)
})
// Setup and use session middleware (https://github.com/expressjs/session).
const sessionOptions = {
  name: process.env.SESSION_NAME, // Don't use default session cookie name.
  secret: process.env.SESSION_SECRET, // Change it!!! The secret is used to hash the session with HMAC.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax'
  }
}
app.set('trust proxy', 1) // trust first proxy
app.use(session(sessionOptions))

// sessionOptions.cookie.secure = true // serve secure cookies

app.set('view engine', 'ejs')
app.use(cors(), router)
app.use('/', router)
app.listen(PORT, () => console.log('App listening on port ' + PORT))
