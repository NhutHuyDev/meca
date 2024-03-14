import validateResource from '@/middlewares/validateResourse'
import ChatOneToOneController from '@/controllers/chatOneToOne.controller'
import asyncHandler from '@/helpers/asyncHandler'
import requireUser from '@/middlewares/requireUser'
import validateResLocal from '@/middlewares/validataResLocal'
import express from 'express'
import { getDetailChatSchema } from '@/schema/chatOneToOne.schema'

const router = express.Router()

router.use(asyncHandler(requireUser))

router.get('/', asyncHandler(ChatOneToOneController.getChatsHandler))

router.get(
  '/:chatOneToOneId',
  validateResource(getDetailChatSchema),
  asyncHandler(ChatOneToOneController.getChatDetailHandler)
)

export default router
