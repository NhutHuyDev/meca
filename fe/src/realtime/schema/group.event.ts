import { object, string, array, TypeOf, enum as enum_, number } from 'zod'

export const create_group_schema = object({
  creatorId: string(),
  participantIds: array(string()).min(2, 'at least two member in a group')
})

export type T_Create_Group = TypeOf<typeof create_group_schema>

export const send_message_schema = object({
  message: object({
    sender: string(),
    type: enum_(['Text', 'Media', 'Document', 'Link']),
    chatGroup: string(),
    text: string().optional(),
    imgUri: string().optional(),
    fileUri: string().optional(),
    link: string().optional(),
    replyMsg: string().optional()
  })
})

export type T_Send_Message = TypeOf<typeof send_message_schema>

export const clear_unread_schema = object({
  groupId: string(),
  currLastMsgId: string().optional(),
  currentId: string()
})

export type T_Clear_Unread = TypeOf<typeof clear_unread_schema>

export const user_seen_schema = object({
  groupId: string(),
  totalUnread: number()
})

export type T_User_Seen = TypeOf<typeof user_seen_schema>
