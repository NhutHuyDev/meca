import { T_Send_Message } from '@/schema/chat.event'
import { OneToOneMessage } from '@/types/message.types'

export enum chatEvent {
  send_message = 'chat:send_request',
  new_message = 'chat:new_message'
}

export type ChatDataType = {
  [chatEvent.send_message]: T_Send_Message
  [chatEvent.new_message]: { newMessage: OneToOneMessage }
}
