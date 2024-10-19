import { prop, getModelForClass } from '@typegoose/typegoose'

export class User {
  @prop({ lowercase: true, required: true })
  email: string

  @prop({ required: true })
  firstName: string

  @prop({ required: true })
  lastName: string

  @prop({ default: null })
  avatar: string

  @prop({ default: null })
  about: string

  @prop({ default: null })
  socketId: string

  @prop({ default: true })
  verified: boolean

  @prop({ default: false })
  online: boolean

  @prop({ default: false })
  deleted: boolean
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    collection: 'Users',
    timestamps: true
  }
})

export default UserModel
