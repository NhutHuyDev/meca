import validateResource from '@/middlewares/validateResourse'
import ChatGroupController from '@/controllers/chatGroup.controller'
import asyncHandler from '@/helpers/asyncHandler'
import requireUser from '@/middlewares/requireUser'
import express from 'express'
import { getChatGroupSchema } from '@/schema/chatGroup.schema'

const router = express.Router()

router.use(asyncHandler(requireUser))

router.get('/', asyncHandler(ChatGroupController.getGroupsHandler))

router.get(
  '/:chatGroupId',
  validateResource(getChatGroupSchema),
  asyncHandler(ChatGroupController.getGroupDetailHandler)
)

export default router
