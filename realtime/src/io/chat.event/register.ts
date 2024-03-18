import { T_Send_Message, T_Clear_Unread, T_User_Seen } from '@/schema/chat.event'
import { OneToOneMessage } from '@/types/message.types'

export enum chatEvent {
  send_message = 'chat:send_request',
  new_message = 'chat:new_message',
  clear_unread = 'chat:clear_unread',
  user_seen = 'chat:user_seen'
}

export type ChatDataType = {
  [chatEvent.send_message]: T_Send_Message
  [chatEvent.new_message]: { newMessage: OneToOneMessage }
  [chatEvent.clear_unread]: T_Clear_Unread
  [chatEvent.user_seen]: T_User_Seen
}
