import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import connectToDatabases from '@/dbs'
import router from '@/routes'

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
app.use(compression())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000
})
/**
 * @description apply rate limiter to all requests
 */
app.use(limiter)

/**
 * @description connect databases
 */
connectToDatabases()

/**
 * @description routes
 */
app.use(router)

export default app
