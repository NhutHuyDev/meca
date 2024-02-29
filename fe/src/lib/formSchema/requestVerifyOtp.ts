import { z } from 'zod'

export const requestVerifyOtpSchema = z.object({
  email: z.string().email('email is invalid')
})
export type TRequestVerifyOtpSchema = z.infer<typeof requestVerifyOtpSchema>
