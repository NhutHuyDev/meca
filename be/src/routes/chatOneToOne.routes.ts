import ChatOneToOneController from '../controllers/chatOneToOne.controller'
import asyncHandler from '../helpers/asyncHandler'
import requireUser from '../middlewares/requireUser'
import validateResLocal from '../middlewares/validataResLocal'
import express from 'express'

const router = express.Router()

router.use(asyncHandler(requireUser))

router.get('/', validateResLocal, asyncHandler(ChatOneToOneController.getChatsHandler))

export default router
