/**
 * @description Danh sách các sự kiện
 */

export enum ChatEvents {
  send_message = 'send_message',
  new_message = 'new_message'
}

/**
 * @description Danh sách kiểu dữ liệu các sự kiện nhận được
 */

export type TSendMessageData = {
  _id: string
  chatOneToOne: string
  type: string
  text: string
  sender: string
  recipient: string
}

export type TNewMessageData = {
  _id: string
  chatOneToOne: string
  type: string
  text: string
  sender: string
  recipient: string
  createdAt: string
}
