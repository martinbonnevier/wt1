
import express from 'express'
import helmet from 'helmet'

import router from './routes/router.js'
import dotenv from 'dotenv'
import cors from 'cors'

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

app.use(cors(), router)
app.use("/", router);
app.use((err, req, res, next) => {
  err.status = err.status || 500

  res.status(err.status).json({
    status: err.status,
    message: err.message
  })
  console.log('Server', err.message)
})


app.set('view engine', 'ejs')
app.listen(PORT, () => console.log('App listening on port ' + PORT))
