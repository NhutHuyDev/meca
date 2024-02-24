import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { User } from './user.model'

export class Credential {
  @prop({ ref: () => User })
  user: Ref<User>

  @prop({ required: true })
  credLogin: string

  @prop({ required: true })
  credPassword: string

  @prop()
  passwordResetCode: string | null

  @prop()
  passwordResetExpires: Date | null
}

const CredentialModel = getModelForClass(Credential, {
  schemaOptions: {
    collection: 'Credentials',
    timestamps: true
  }
})

export default CredentialModel
