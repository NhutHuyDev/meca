import checkValidObjectId from '@/utils/checkValidObjectId'
import { object, string, array, TypeOf, enum as enum_, number } from 'zod'

const participantId = string().refine(checkValidObjectId)

export const create_group_schema = object({
  creatorId: string().refine(checkValidObjectId),
  participantIds: array(participantId).nonempty()
})

export type T_Create_Group = TypeOf<typeof create_group_schema>

export const send_message_schema = object({
  message: object({
    sender: string().refine(checkValidObjectId),
    type: enum_(['Text', 'Media', 'Document', 'Link']),
    chatGroup: string().refine(checkValidObjectId),
    text: string().optional(),
    imgUri: string().optional(),
    fileUri: string().optional(),
    link: string().optional(),
    replyMsg: string().optional()
  })
})

export type T_Send_Message = TypeOf<typeof send_message_schema>

export const clear_unread_schema = object({
  groupId: string().refine(checkValidObjectId),
  currentId: string().refine(checkValidObjectId),
  currLastMsgId: string().refine(checkValidObjectId)
})

export type T_Clear_Unread = TypeOf<typeof clear_unread_schema>
