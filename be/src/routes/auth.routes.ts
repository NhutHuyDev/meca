import express from 'express'
import validateResource from '../middlewares/validateResourse'
import { createSessionSchema } from '../schema/session.schema'
import asyncHandler from '../helpers/asyncHandler'
import AuthController from '../controllers/auth.controller'
import validateHeader from '../middlewares/validateHeader'

const router = express.Router()
router.post(
  '/sign-in',
  validateResource(createSessionSchema),
  asyncHandler(AuthController.signInHandler)
)
router.post('/refresh', validateHeader, asyncHandler(AuthController.refreshAccessTokenHandler))
router.post('/sign-out', validateHeader, asyncHandler(AuthController.signOutHandler))

export default router
