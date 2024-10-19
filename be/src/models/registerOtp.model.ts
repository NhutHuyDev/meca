import {
  getModelForClass,
  prop,
  pre,
  DocumentType,
  Severity,
  modelOptions
} from '@typegoose/typegoose'
import argon2 from 'argon2'
import otpGentertor from 'otp-generator'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@pre<RegisterOtp>('save', async function () {
  if (!this.isModified('currentOtp') || !this.currentOtp) {
    return
  }

  const hashOtp = await argon2.hash(this.currentOtp)

  this.currentOtp = hashOtp

  return
})
export class RegisterOtp {
  @prop({ unique: true, required: true })
  email: string

  @prop()
  currentOtp: string | null

  @prop()
  expiredAt: Date | null

  @prop()
  verified: boolean

  async validateOtp(this: DocumentType<RegisterOtp>, candidateOtp: string) {
    try {
      if (this.currentOtp) return await argon2.verify(this.currentOtp, candidateOtp)
    } catch (e) {
      return false
    }
  }

  generateOtp(this: DocumentType<RegisterOtp>) {
    const expiredTime = Date.now() + 10 * 60 * 1000 // after 10 minutes
    const otpLength = 6

    const newOTP = otpGentertor.generate(otpLength, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    })

    this.currentOtp = newOTP
    this.expiredAt = new Date(expiredTime)
    this.verified = false

    return newOTP
  }
}

const RegisterOtpModel = getModelForClass(RegisterOtp, {
  schemaOptions: {
    collection: 'RegisterOtps',
    timestamps: true
  }
})

export default RegisterOtpModel
