import { Request, Response, NextFunction } from 'express'
import customHttpHeaders from '@/utils/customHttpHeaders'
import checkValidObjectId from '@/utils/checkValidObjectId'
import { BadRequestError } from '@/core/error.responses'

const validateHeader = (req: Request, _: Response, next: NextFunction) => {
  /**
   * @description validate clientId
   */

  const clientId = req.headers[customHttpHeaders.CLIENT_ID] as string

  if (!clientId || checkValidObjectId(clientId)) {
    next()
  } else {
    const clientIdError = new BadRequestError(`clientId isn't valid`)
    next(clientIdError)
  }
}

export default validateHeader
