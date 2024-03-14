import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'
import { ChatGroup } from './chatGroup.model'
import { ChatOneToOne } from './chatOneToOne.model'

export enum messageType {
  Text = 'Text',
  Media = 'Media',
  Document = 'Document',
  Link = 'Link'
}

export class Message {
  @prop({ ref: () => User })
  sender: Ref<User>

  @prop({ ref: () => User })
  recipient: Ref<User>

  @prop({ required: true, enum: messageType })
  type: string

  @prop()
  text: string

  @prop()
  imgUri: string

  @prop()
  fileUri: string

  @prop()
  link: string

  @prop({ ref: () => Message })
  replyMsg: Ref<Message>

  @prop({ ref: () => ChatGroup })
  chatGroup: Ref<ChatGroup>

  @prop({ ref: () => ChatOneToOne })
  chatOneToOne: Ref<ChatOneToOne>
}

const MessageModel = getModelForClass(Message, {
  schemaOptions: {
    collection: 'Messages',
    timestamps: true
  }
})

export default MessageModel
