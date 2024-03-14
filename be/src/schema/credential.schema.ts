import checkValidObjectId from '@/utils/checkValidObjectId'
import { object, string, TypeOf } from 'zod'

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  })
})

export const resetPasswordSchema = object({
  params: object({
    userId: string({
      required_error: 'user id is required'
    }),
    passwordResetCode: string({
      required_error: 'password reset code is required'
    })
  }).refine((data) => checkValidObjectId(data.userId), {
    message: 'userId is not valid',
    path: ['userId']
  }),

  body: object({
    password: string({
      required_error: 'Password is required'
    }).min(6, 'Password is too short - should be min 6 chars'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required'
    })
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })
})

export type TForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>['body']

export type TResetPasswordSchema = TypeOf<typeof resetPasswordSchema>
