import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email'),

    firstName: string({
      required_error: 'First name is required'
    }),

    lastName: string({
      required_error: 'Last name is required'
    }),

    credPassword: string({
      required_error: 'Password is required'
    }).min(6, 'Password is too short - should be min 6 chars'),

    passwordConfirmation: string({
      required_error: 'Password confirmation is required'
    })
  }).refine((data) => data.credPassword === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })
})

export const updateUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email'),

    firstName: string().min(3, 'first must be longer than 2 characters').optional(),

    lastName: string().min(3, 'last name must be longer than 2 characters').optional(),

    about: string().optional(),

    avatar: string().optional()
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

export const requestVerifyOtpSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  })
})

export type TCreateUserSchema = TypeOf<typeof createUserSchema>['body']

export type TUpdateUserSchema = TypeOf<typeof updateUserSchema>['body']

export type TVerifyUserSchema = TypeOf<typeof verifyUserSchema>['body']

export type TRequestVerifyOtpSchema = TypeOf<typeof requestVerifyOtpSchema>['body']
