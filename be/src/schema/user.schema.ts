import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required'
    }),

    lastName: string({
      required_error: 'Last name is required'
    }),

    password: string({
      required_error: 'Lass name is required'
    }).min(6, 'Password is too short - should be min 6 chars'),

    passwordConfirmation: string({
      required_error: 'Password confirmation is required'
    }),

    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })
})

export const verifyUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email'),
    otp: string().regex(/^\d+$/, 'otp is not valid').min(6, 'otp is not valid')
  })
})

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  })
})

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string()
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

export const requestVerifyOtpSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  })
})

export type TCreateUserSchema = TypeOf<typeof createUserSchema>['body']

export type TVerifyUserSchema = TypeOf<typeof verifyUserSchema>['body']

export type TForgotPasswordSchema = TypeOf<typeof forgotPasswordSchema>['body']

export type TResetPasswordSchema = TypeOf<typeof resetPasswordSchema>

export type TRequestVerifyOtpSchema = TypeOf<typeof requestVerifyOtpSchema>['body']
