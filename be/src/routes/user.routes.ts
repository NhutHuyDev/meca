import express from 'express'
import validateResource from '../middlewares/validateResourse'
import {
  requestVerifyOtpSchema,
  createUserSchema,
  verifyUserSchema,
  updateUserSchema
} from '../schema/user.schema'
import UserController from '../controllers/user.controller'
import asyncHandler from '../helpers/asyncHandler'
import requireUser from '../middlewares/requireUser'
import { update } from 'lodash'

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

router.use(asyncHandler(requireUser))

router.patch(
  '/',
  validateResource(updateUserSchema),
  asyncHandler(UserController.updateInformationHandler)
)

router.get('/me', asyncHandler(UserController.getCurrentUserHandler))

export default router
