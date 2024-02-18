import express from 'express'
import validateResource from '../middlewares/validateResourse'
import { createSessionSchema } from '../schema/session.schema'
import asyncHandler from '../helpers/asyncHandler'
import AuthController from '../controllers/auth.controller'

const router = express.Router()
router.post('/', validateResource(createSessionSchema), asyncHandler(AuthController.createSessionHandler))
router.post('/refresh', asyncHandler(AuthController.refreshAccessTokenHandler))
router.post('/sign-out', asyncHandler(AuthController.signOutHandler))

export default router
