import { T_Clear_Unread, T_Create_Group, T_Send_Message } from '@/schema/group.event'
import { GroupMessage } from '@/types/message.types'

export enum groupEvent {
  create_group = 'group:create',
  create_success = 'group:create_success',
  send_message = 'group:send_message',
  new_message = 'group:new_message',
  clear_unread = 'group:clear_unread',
  user_seen = 'group:user_seen'
}

export type GroupDataType = {
  [groupEvent.create_group]: T_Create_Group
  [groupEvent.create_success]: { newGroupId: string }
  [groupEvent.send_message]: T_Send_Message
  [groupEvent.new_message]: { newMessage: GroupMessage }
  [groupEvent.clear_unread]: T_Clear_Unread
  [groupEvent.user_seen]: { groupId: string; totalUnread: number }
}
