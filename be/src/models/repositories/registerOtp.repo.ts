import RegisterOtpModel from '../registerOtp'
import otpGentertor from 'otp-generator'

class RegisterOtpRepo {
  static generateNewOtp = async function (email: string) {
    const expiredTime = Date.now() + 10 * 60 * 1000 // after 10 minutes
    const otpLength = 6

    const otp = otpGentertor.generate(otpLength, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    })

    await RegisterOtpModel.create({
      email: email,
      otpCode: otp,
      expiredAt: expiredTime
    })

    return otp
  }

  static findValidOtpByEmail = async function (email: string) {
    return RegisterOtpModel.findOne({
      email: email,
      available: true,
      expiredAt: { $gt: Date.now() }
    })
  }

  static disableOtpById = async function (id: string) {
    await RegisterOtpModel.findByIdAndUpdate(id, {
      available: false
    })
  }
}

export default RegisterOtpRepo
