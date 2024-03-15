import { object, string, TypeOf, enum as enum_ } from 'zod'

export const send_message_schema = object({
  message: object({
    sender: string(),
    recipient: string(),
    type: enum_(['Text', 'Media', 'Document', 'Link']),
    chatOneToOne: string(),
    text: string().optional(),
    imgUri: string().optional(),
    fileUri: string().optional(),
    link: string().optional(),
    replyMsg: string().optional()
  })
})

export type T_Send_Message = TypeOf<typeof send_message_schema>

export const clear_unread_schema = object({
  chatOneToOneId: string(),
  currentId: string()
})

export type T_Clear_Unread = TypeOf<typeof clear_unread_schema>
