import { Request, Response, NextFunction } from 'express'
import checkValidObjectId from '@/utils/checkValidObjectId'
import { BadRequestError } from '@/core/error.responses'

const validateResLocal = (_: Request, res: Response, next: NextFunction) => {
  /**
   * @description validate user id
   */

  const user = res.locals.user

  if (checkValidObjectId(user._id)) {
    next()
  } else {
    const clientIdError = new BadRequestError(`clientId isn't valid`)
    next(clientIdError)
  }
}

export default validateResLocal
