import { z } from 'zod'

export const signInSchema = z.object({
  credLogin: z.string().email('email is invalid'),
  credPassword: z.string().min(6, 'password must be at least 6 characters')
})

export type TSignInSchema = z.infer<typeof signInSchema>
