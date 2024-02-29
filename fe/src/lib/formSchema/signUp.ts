import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().email('email is not valid'),
    firstName: z.string().min(1, 'first name is required'),
    lastName: z.string().min(1, 'last name is required'),
    credPassword: z.string().min(6, 'password must be at least 6 characters'),
    passwordConfirmation: z.string()
  })
  .refine(
    (formData) => formData.credPassword === formData.passwordConfirmation,
    {
      message: 'confirm password must match',
      path: ['confirmPassword']
    }
  )

export type TSignUpSchema = z.infer<typeof signUpSchema>
