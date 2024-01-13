import {
  TNewPasswordSchema,
  newPasswordSchema
} from '@/lib/formSchema/newPassword'
import { useForm, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'

function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<TNewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema)
  })

  const onSubmit = async (data: FieldValues) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 4000))

    console.log(data)

    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-end'>
        <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
          <input
            {...register('newPassword')}
            placeholder='Password'
            className='w-full text-base outline-none'
            type={showPassword ? 'text' : 'password'}
          />
          {showPassword ? (
            <button onClick={() => setShowPassword(false)} type='button'>
              <Eye />
            </button>
          ) : (
            <button onClick={() => setShowPassword(true)} type='button'>
              <EyeSlash />
            </button>
          )}
        </div>

        {errors.newPassword && (
          <p className='text-left text-error-main'>{`${errors.newPassword.message}`}</p>
        )}

        <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
          <input
            {...register('confirmNewPassword')}
            placeholder='Confirm password'
            className='w-full text-base outline-none'
            type={showConfirmPassword ? 'text' : 'password'}
          />
          {showConfirmPassword ? (
            <button onClick={() => setShowConfirmPassword(false)} type='button'>
              <Eye />
            </button>
          ) : (
            <button onClick={() => setShowConfirmPassword(true)} type='button'>
              <EyeSlash />
            </button>
          )}
        </div>

        {errors.confirmNewPassword && (
          <p className='text-left text-error-main'>{`${errors.confirmNewPassword.message}`}</p>
        )}

        <button
          disabled={isSubmitting}
          type='submit'
          className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
        >
          Reset Password
        </button>
      </form>
    </>
  )
}

export default SignUp
