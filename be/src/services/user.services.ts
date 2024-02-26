import { BadRequestError, ConflictError } from '../core/error.responses'
import { omit } from 'lodash'
import UserRepo from '../models/repositories/user.repo'
import RegisterOtpRepo from '../models/repositories/registerOtp.repo'
import UserModel, { User, privateFields } from '../models/user.model'
import CredentialModel, { Credential } from '../models/credential.model'
import sendEmail from '../utils/mailer'
import KeyStoreRepo from '../models/repositories/keyStore.repo'

class UserService {
  static requestVerifyOtp = async function (email: string) {
    /**
     * @description 1. kiểm tra email đang được user nào sử dụng chưa
     */
    const user = await UserRepo.findUserByEmail(email || '')

    if (user && user.verified && !user.deleted)
      throw new ConflictError('email is already in use. Please use another email!')

    /**
     * @description 2. kiểm tra đã tồn tại yêu cầu xác thức trước đó chưa
     *                2.1. chưa - tạo và lưu otp mới cho email
     *                2.2. rồi - update otp mới cho email
     */

    let newOtp = null

    const existedRequest = await RegisterOtpRepo.findOneByEmail(email)
    if (!existedRequest) {
      const registerOtp = await RegisterOtpRepo.createRegisterOtp(email)
      newOtp = registerOtp.generateOtp()
      registerOtp.save()
    } else {
      newOtp = existedRequest.generateOtp()
      existedRequest.save()
    }

    await sendEmail({
      to: email,
      from: 'test@example.com',
      subject: 'Your verify OTP for this email from MECA.',
      text: `OTP code: ${newOtp}.`
    })

    return {
      email: email,
      message: `send OTP to email - ${email} successfully`
    }
  }

  static verifyUser = async function (email: string, candidateOtp: string) {
    /**
     * @description 1. kiểm tra có tồn tại yêu cầu xác thực cho email hiện tại hay không
     */
    const otp = await RegisterOtpRepo.findValidOtpByEmail(email)
    if (!otp) throw new BadRequestError("email or otp isn't valid")

    /**
     * @description 2. kiểm tra otp có hợp lệ hay không
     */
    if (await otp.validateOtp(candidateOtp)) {
      otp.currentOtp = null
      otp.verified = true

      await otp.save()

      return {
        email: email,
        message: `verify email - ${email} successfully`
      }
    } else {
      throw new BadRequestError("otp isn't valid")
    }
  }

  static createUser = async function (input: Partial<User> & Partial<Credential>) {
    /**
     * @description 1. kiểm tra email đã được xác thực chưa
     */
    const verifiedUser = await RegisterOtpRepo.checkOptIsVerified(input.email || '')

    if (!verifiedUser) throw new BadRequestError("email isn't verified")

    /**
     * @description 2. tạo thông tin cho user
     */
    const newUser = await UserModel.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName
    })

    /**
     * @description 3. tạo cập khóa public key và private key cho user
     */

    await KeyStoreRepo.createKeyPair(String(newUser._id))

    /**
     * @description 4. tạo thông tin đăng nhập cho user
     */

    await CredentialModel.create({
      user: newUser._id,
      credLogin: input.email,
      credPassword: input.credPassword
    })

    return omit(newUser.toJSON(), privateFields)
  }
}

export default UserService
