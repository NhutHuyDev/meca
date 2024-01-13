import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('email is invalid'),
  password: z.string().min(10, 'Password must be at least 10 characters')
})

export type TSignInSchema = z.infer<typeof signInSchema>
