import { prop, getModelForClass } from '@typegoose/typegoose'

export class User {
  @prop({ lowercase: true, required: true })
  email: string

  @prop({ required: true })
  firstName: string

  @prop({ required: true })
  lastName: string

  @prop()
  avatar: string

  @prop()
  about: string

  @prop({ default: true })
  verified: boolean

  @prop({ default: false })
  deleted: boolean
}

export const privateFields = ['__v', 'verified', 'deleted']

const UserModel = getModelForClass(User, {
  schemaOptions: {
    collection: 'Users',
    timestamps: true
  }
})

export default UserModel
