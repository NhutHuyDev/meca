import express from 'express'
import validateResource from '../middlewares/validateResourse'
import {
  requestVerifyOtpSchema,
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../schema/user.schema'
import UserController from '../controllers/user.controller'
import asyncHandler from '../helpers/asyncHandler'
// import requireUser from '../middlewares/requireUser'

const router = express.Router()

router.post(
  '/request-verify-otp',
  validateResource(requestVerifyOtpSchema),
  asyncHandler(UserController.requestVerifyOtpHandler)
)

router.post(
  '/verify',
  validateResource(verifyUserSchema),
  asyncHandler(UserController.verifyUserHandler)
)

router.post(
  '/',
  validateResource(createUserSchema),
  asyncHandler(UserController.createUserHandler)
)

// router.post(
//   '/forgotpassword',
//   validateResource(forgotPasswordSchema),
//   asyncHandler(UserController.forgotPasswordHandler)
// )
// router.post(
//   '/resetpassword/:id/:passwordResetCode',
//   validateResource(resetPasswordSchema),
//   asyncHandler(UserController.resetPasswordHandler)
// )

// router.use(asyncHandler(requireUser))
// router.get('/me', asyncHandler(UserController.getCurrentUserHandler))

export default router
