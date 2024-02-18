import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { User } from '../models/user.model'

export class Session {
  @prop({ ref: () => User })
  user: Ref<User>

  @prop({})
  refreshToken: string

  @prop({ default: true })
  valid: boolean
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    collection: 'Sessions',
    timestamps: true
  }
})

export default SessionModel
