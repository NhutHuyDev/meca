import checkValidObjectId from '../utils/checkValidObjectId'
import { object, string, TypeOf } from 'zod'

export const getDetailChatSchema = object({
  params: object({
    chatOneToOneId: string({
      required_error: 'chatOneToOne id is required'
    })
  }).refine((data) => checkValidObjectId(data.chatOneToOneId), {
    message: 'chatOneToOneId is not valid',
    path: ['userId']
  })
})

export type TGetDetailChatSchema = TypeOf<typeof getDetailChatSchema>['params']
