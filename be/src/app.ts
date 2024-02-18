import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import connectToDatabases from './dbs'
import router from './routes'

const app = express()

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

/**
 * @description connect databases
 */
connectToDatabases()

/**
 * @description routes
 */
app.use(router)

export default app
