import {
  T_Accept_Request,
  T_Cancel_Request,
  T_Reject_Request,
  T_Send_Request,
  T_Un_Friend
} from '@/schema/friend.event'

export enum friendEvent {
  send_request = 'friend:send_request',
  new_request = 'friend:new_request',
  request_success = 'friend:request_success',

  accept_request = 'friend:accept_request',
  accepted_success = 'friend:accepted_success',
  new_friend = 'friend:new_friend',

  cancel_request = 'friend:cancel_request',
  cancel_success = 'friend:cancel_success',

  reject_request = 'friend:reject_request',
  reject_success = 'friend:reject_success',

  un_friend = 'friend:un_friend',
  un_friend_success = 'friend:un_friend_success'
}

export type FriendDataType = {
  [friendEvent.send_request]: T_Send_Request
  [friendEvent.new_request]: { message: string }
  [friendEvent.request_success]: { message: string }

  [friendEvent.accept_request]: T_Accept_Request
  [friendEvent.accepted_success]: { message: string }
  [friendEvent.new_friend]: { message: string }

  [friendEvent.cancel_request]: T_Cancel_Request
  [friendEvent.cancel_success]: { message: string }

  [friendEvent.reject_request]: T_Reject_Request
  [friendEvent.reject_success]: { message: string }

  [friendEvent.un_friend]: T_Un_Friend
  [friendEvent.un_friend_success]: { message: string }
}
