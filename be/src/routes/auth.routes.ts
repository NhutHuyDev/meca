import express from 'express'
import validateResource from '../middlewares/validateResourse'
import { createSessionSchema } from '../schema/session.schema'
import asyncHandler from '../helpers/asyncHandler'
import AuthController from '../controllers/auth.controller'
import validateHeader from '../middlewares/validateHeader'
import { forgotPasswordSchema, resetPasswordSchema } from '../schema/credential.schema'
import CredentialController from '../controllers/credential.controller'
import requireUser from '../middlewares/requireUser'

const router = express.Router()
router.post(
  '/sign-in',
  validateResource(createSessionSchema),
  asyncHandler(AuthController.signInHandler)
)
router.post('/refresh', validateHeader, asyncHandler(AuthController.refreshAccessTokenHandler))

router.post(
  '/forgot-password',
  validateResource(forgotPasswordSchema),
  asyncHandler(CredentialController.forgotPasswordHandler)
)

router.post(
  '/reset-password/:userId/:passwordResetCode',
  validateResource(resetPasswordSchema),
  asyncHandler(CredentialController.resetPasswordHandler)
)

router.use(asyncHandler(requireUser))
router.post('/sign-out', validateHeader, asyncHandler(AuthController.signOutHandler))

export default router
