import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectToDatabases from './dbs'

const app = express()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'DELETE'],
    credentials: true
  })
)

/**
 * @description third-party middleware
 */
app.use(helmet())

/**
 * @description apply rate limiter to all requests
 */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000
})
app.use(limiter)

/**
 * @description connect databases
 */
connectToDatabases()

app.get('/', (req, res) => res.send('OK'))

export default app
