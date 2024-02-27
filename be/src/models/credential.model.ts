import {
  Ref,
  getModelForClass,
  prop,
  pre,
  DocumentType,
  modelOptions,
  Severity
} from '@typegoose/typegoose'
import { User } from './user.model'
import argon2 from 'argon2'
import { nanoid } from 'nanoid'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@pre<Credential>('save', async function () {
  if (this.isModified('credPassword')) {
    const hashPassword = await argon2.hash(this.credPassword)
    this.credPassword = hashPassword
  }

  if (this.isModified('passwordResetCode') && this.passwordResetCode) {
    const hashResetCode = await argon2.hash(this.passwordResetCode)
    this.passwordResetCode = hashResetCode
  }

  return
})
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

  async validatePassword(this: DocumentType<Credential>, candidatePassword: string) {
    try {
      return await argon2.verify(this.credPassword, candidatePassword)
    } catch (error) {
      return false
    }
  }

  generatePasswordResetCode(this: DocumentType<Credential>) {
    const expiredTime = Date.now() + 10 * 60 * 1000 // after 10 minutes
    const newResetCode = nanoid()

    this.passwordResetCode = newResetCode
    this.passwordResetExpires = new Date(expiredTime)

    return newResetCode
  }

  async validatePasswordResetCode(this: DocumentType<Credential>, candidateCode: string) {
    try {
      if (this.passwordResetCode)
        return await argon2.verify(this.passwordResetCode, candidateCode)
    } catch (error) {
      return false
    }
  }
}

const CredentialModel = getModelForClass(Credential, {
  schemaOptions: {
    collection: 'Credentials',
    timestamps: true
  }
})

export default CredentialModel
