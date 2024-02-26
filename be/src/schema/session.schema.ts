import { object, string, TypeOf } from 'zod'

export const createSessionSchema = object({
  body: object({
    credLogin: string({
      required_error: 'Email is required'
    }).email('Invalid email or password'),
    credPassword: string({
      required_error: 'Password is required'
    }).min(6, 'Invalid email or password')
  })
})

export type TCreateSessionSchema = TypeOf<typeof createSessionSchema>['body']
