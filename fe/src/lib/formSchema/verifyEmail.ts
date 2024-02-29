import { z } from 'zod'

export const verifyEmailSchema = z.object({
  email: z.string().email('email is invalid'),
  otp: z.string().max(6, 'too long')
})
export type TVerifyEmailSchema = z.infer<typeof verifyEmailSchema>
