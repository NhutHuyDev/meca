export type ContactUser = {
  _id: string
  email?: string
  firstName: string
  lastName: string
  verified?: boolean
  deleted?: boolean
  avatar?: string
  about?: string
  socketId?: string
  online?: boolean
  isFriend?: boolean
  isSentFriendRequest?: boolean
  wantToMakeFriend?: boolean
  friendshipRequestId?: string
}
