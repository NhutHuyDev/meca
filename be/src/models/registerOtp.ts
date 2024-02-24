import log from '@/utils/logger'
import { getModelForClass, prop, pre, DocumentType } from '@typegoose/typegoose'
import argon2 from 'argon2'

@pre<RegisterOtp>('save', async function () {
  if (!this.isModified('otpCode')) {
    return
  }

  const hashOtp = await argon2.hash(this.otpCode)

  this.otpCode = hashOtp

  return
})
export class RegisterOtp {
  @prop({ required: true })
  email: string

  @prop({ required: true })
  otpCode: string

  @prop({ required: true })
  expiredAt: Date

  @prop({ default: false })
  verified: boolean

  @prop({ default: true })
  available: boolean

  async validateOtp(this: DocumentType<RegisterOtp>, candidateOtp: string) {
    try {
      return await argon2.verify(this.otpCode, candidateOtp)
    } catch (e) {
      log.error(e, 'Could not validate register otp')
      return false
    }
  }
}

const RegisterOtpModel = getModelForClass(RegisterOtp, {
  schemaOptions: {
    collection: 'RegisterOtp',
    timestamps: true
  }
})

export default RegisterOtpModel
