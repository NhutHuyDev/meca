import { object, string, TypeOf } from 'zod'

export const send_request_schema = object({
  fromId: string(),
  toId: string()
})

export type T_Send_Request = TypeOf<typeof send_request_schema>

// --

export const accept_request_schema = object({
  requestId: string(),
  recipientId: string()
})

export type T_Accept_Request = TypeOf<typeof accept_request_schema>

// --

export const cancel_request_schema = object({
  requestId: string(),
  senderId: string()
})

export type T_Cancel_Request = TypeOf<typeof cancel_request_schema>

// --

export const reject_request_schema = object({
  requestId: string(),
  recipientId: string()
})

export type T_Reject_Request = TypeOf<typeof reject_request_schema>

// --

export const un_friend_schema = object({
  fromId: string(),
  friendId: string()
})

export type T_Un_Friend = TypeOf<typeof un_friend_schema>
