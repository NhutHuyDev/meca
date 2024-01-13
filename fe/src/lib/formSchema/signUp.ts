import { z } from 'zod'

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'first name is required'),
    lastName: z.string().min(1, 'last name is required'),
    email: z.string().email('email is not valid'),
    password: z.string().min(10, 'password must be at least 10 characters'),
    confirmPassword: z.string()
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: 'confirm password must match',
    path: ['confirmPassword']
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>
