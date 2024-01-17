const express = require('express')
const morgan = require('morgan') //Logger
const helmet = require('helmet') //secure HTTP headers
const rateLimit = require('express-rate-limit')
const compression = require('compression')
const cors = require('cors')

require('dotenv').config()

const app = express()

// middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
)
app.use(helmet())
app.use(compression())
app.use(
  express.json({
    limit: '10kb'
  })
)
app.use(
  express.urlencoded({
    extended: true
  })
)

// logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests from this IP, please try again in an hour'
})

app.use(limiter)

module.exports = app
