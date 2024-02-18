import express, { Request, Response, NextFunction } from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import { NotFoundError } from '../core/error.responses'
import log from '../utils/logger'
import deserializeUser from '../middlewares/deserializeUser'

const router = express.Router()

router.get('/v1/api/healthcheck', (_, res) => res.sendStatus(200))

/**
 * @description deserializeUser
 */
router.use(deserializeUser)

/**
 * @description feature routes
 */
router.use('/v1/api/users', userRoutes)
router.use('/v1/api/sessions', authRoutes)

/**
 * @description 404 handling
 */
router.use((req, res, next) => {
  const error = new NotFoundError()
  next(error)
})

/**
 * @description error handling
 */
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  log.error(error.stack)
  const status = error.code >= 400 && error.code < 500 ? 'error' : 'fail'
  return res.status(error.code || 500).json({
    code: error.code || 500,
    status: status,
    message: error.message || 'Internal server error'
  })
})

export default router
