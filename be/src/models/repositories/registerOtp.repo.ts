import RegisterOtpModel from '@/models/registerOtp.model'

class RegisterOtpRepo {
  static createRegisterOtp = async function (email: string) {
    return RegisterOtpModel.create({
      email: email
    })
  }

  static checkOptIsVerified = async function (email: string) {
    return RegisterOtpModel.findOne({
      email: email,
      verified: true,
      expiredAt: { $ne: null, $gt: new Date() }
    })
  }

  static findOneByEmail = async function (email: string) {
    return RegisterOtpModel.findOne({
      email: email
    })
  }

  static findValidOtpByEmail = async function (email: string) {
    return RegisterOtpModel.findOne({
      email: email,
      currentOtp: { $ne: null },
      expiredAt: { $ne: null, $gt: new Date() }
    })
  }
}

export default RegisterOtpRepo
