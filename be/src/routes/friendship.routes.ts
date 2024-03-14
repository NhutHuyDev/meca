import FriendshipController from '@/controllers/friendship.controller'
import asyncHandler from '@/helpers/asyncHandler'
import requireUser from '@/middlewares/requireUser'
import validateResLocal from '@/middlewares/validataResLocal'
import express from 'express'

const router = express.Router()

router.use(asyncHandler(requireUser))

router.get('/', asyncHandler(FriendshipController.getFriendsHandler))
router.get('/requests', asyncHandler(FriendshipController.getFriendRequestsHandler))

export default router
