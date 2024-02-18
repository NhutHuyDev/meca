import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../core/error.responses'

const requireUser = async (_: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user

  if (!user) {
    throw new ForbiddenError()
  }

  return next()
}

export default requireUser
