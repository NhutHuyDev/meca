import checkValidObjectId from '@/utils/checkValidObjectId'
import { object, string, TypeOf, enum as enum_ } from 'zod'

export const send_message_schema = object({
  message: object({
    sender: string().refine(checkValidObjectId),
    recipient: string().refine(checkValidObjectId),
    type: enum_(['Text', 'Media', 'Document', 'Link']),
    chatOneToOne: string().refine(checkValidObjectId),
    text: string().optional(),
    imgUri: string().optional(),
    fileUri: string().optional(),
    link: string().optional(),
    replyMsg: string().optional()
  })
})

export type T_Send_Message = TypeOf<typeof send_message_schema>

export const clear_unread_schema = object({
  chatOneToOneId: string().refine(checkValidObjectId),
  currentId: string().refine(checkValidObjectId)
})

export type T_Clear_Unread = TypeOf<typeof clear_unread_schema>

export const user_seen_schema = object({
  chatOneToOneId: string()
})

export type T_User_Seen = TypeOf<typeof user_seen_schema>
