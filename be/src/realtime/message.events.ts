import { Server, Socket } from 'socket.io'

export enum FriendEvents {
  sendText = 'send_text',
  sendFile = 'send_file',
  sendImg = 'send_img',
  sendLink = 'send_link',
  replyMsg = 'reply_msg'
}

function handleMessageEvent(socket: Socket, io: Server): void {
  /**
   * @description ::Event - message
   */

  socket.on(FriendEvents.sendText, async (data) => {})
  socket.on(FriendEvents.sendFile, async (data) => {})
  socket.on(FriendEvents.sendImg, async (data) => {})
  socket.on(FriendEvents.sendLink, async (data) => {})
  socket.on(FriendEvents.replyMsg, async (data) => {})
}

export default handleMessageEvent
