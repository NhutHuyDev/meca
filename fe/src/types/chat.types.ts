import { GroupMessage, OneToOneMessage } from './message.types'
import { ContactUser } from './user.types'

export type ChatOneToOne = {
  _id: string
  from: ContactUser
  isFriend: boolean
  unread: number
  lastMessage: OneToOneMessage
  pinned?: boolean
  statusLastMessage: string
}

export type ChatGroup = {
  _id: string
  members: ContactUser[]
  creator?: ContactUser
  currentUnread: number
  lastMessage: GroupMessage
  pinned?: boolean
  statusLastMessage?: string
}
