import { prop, pre, modelOptions, getModelForClass, Severity, DocumentType } from '@typegoose/typegoose'
import argon2 from 'argon2'
import log from '../utils/logger'
import { nanoid } from 'nanoid'

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  const hash = await argon2.hash(this.password)

  this.password = hash

  return
})
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string

  @prop({ required: true })
  firstName: string

  @prop({ required: true })
  lastName: string

  @prop({ required: true })
  password: string

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string

  @prop()
  passwordResetCode: string | null

  @prop({ default: false })
  verified: boolean

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword)
    } catch (e) {
      log.error(e, 'Could not validate password')
      return false
    }
  }
}

export const privateFields = ['password', '__v', 'verificationCode', 'passwordResetCode', 'verified']

const UserModel = getModelForClass(User, {
  schemaOptions: {
    collection: 'Users',
    timestamps: true
  }
})

export default UserModel
