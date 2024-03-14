import checkValidObjectId from '@/utils/checkValidObjectId'
import { object, string, TypeOf, enum as enum_ } from 'zod'

export const send_message_schema = object({
  message: object({
    _id: string().refine(checkValidObjectId),
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
