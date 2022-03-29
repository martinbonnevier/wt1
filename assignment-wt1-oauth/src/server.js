
import express from 'express'
import helmet from 'helmet'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import router from './routes/router.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
// console.log(process.env)

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

app.use(express.static('public'))
app.use((err, req, res, next) => {
  err.staus = err.status || 500
  res.status(err.status).json({
    status: err.status,
    message: err.message
  })
})

app.use(cors(), router)
const PORT = process.env.PORT
app.set('view engine', 'ejs')
app.listen(PORT, () => console.log('App listening on port ' + PORT))
