import { Request, Response } from 'express'
import {
  TRequestVerifyOtpSchema,
  TCreateUserSchema,
  TVerifyUserSchema,
  TUpdateUserSchema
} from '@/schema/user.schema'
import UserService from '@/services/user.services'
import { CreatedResponse, OkResponse } from '@/core/success.responses'

class UserController {
  static requestVerifyOtpHandler = async function (
    req: Request<object, object, TRequestVerifyOtpSchema>,
    res: Response
  ) {
    new CreatedResponse(await UserService.requestVerifyOtp(req.body.email)).send(res)
  }

  static verifyUserHandler = async function (
    req: Request<object, object, TVerifyUserSchema>,
    res: Response
  ) {
    const email = req.body.email
    const otp = req.body.otp
    new OkResponse(await UserService.verifyUser(email, otp)).send(res)
  }

  static createUserHandler = async function (
    req: Request<object, object, TCreateUserSchema>,
    res: Response
  ) {
    new CreatedResponse(await UserService.createUser(req.body)).send(res)
  }

  static updateInformationHandler = async function (
    req: Request<object, object, TUpdateUserSchema>,
    res: Response
  ) {
    const email = res.locals.user.email
    // console.log('::email', email)
    new OkResponse(await UserService.updateInformation(email, req.body)).send(res)
  }

  static getCurrentUserHandler = async function (_: Request, res: Response) {
    new OkResponse(res.locals.user).send(res)
  }

  static getOtherUserHandler = async function (_: Request, res: Response) {
    const user = res.locals.user

    new OkResponse(await UserService.getOtherUser(user._id)).send(res)
  }
}

export default UserController
