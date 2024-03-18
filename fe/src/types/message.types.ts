export type OneToOneMessage = {
  _id: string

  sender?: string

  recipient?: string

  type?: string

  chatOneToOne?: string

  text?: string

  imgUri?: string

  fileUri?: string

  link?: string

  replyMsg?: string

  createdAt?: string

  isLastMessage?: boolean
}

export type GroupMessage = {
  _id: string

  sender?: string

  recipient?: string

  type?: string

  chatGroup?: string

  text?: string

  imgUri?: string

  fileUri?: string

  link?: string

  replyMsg?: string

  createdAt: string

  isLastMessage?: boolean
}