import checkValidObjectId from '@/utils/checkValidObjectId'
import { object, string, TypeOf } from 'zod'

export const getChatGroupSchema = object({
  params: object({
    chatGroupId: string({
      required_error: 'chatOneToOne id is required'
    })
  }).refine((data) => checkValidObjectId(data.chatGroupId), {
    message: 'chatOneToOneId is not valid',
    path: ['chatOneToOneId']
  })
})

export type TGetChatGroupSchema = TypeOf<typeof getChatGroupSchema>['params']
