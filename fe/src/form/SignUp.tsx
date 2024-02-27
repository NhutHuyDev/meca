import { TSignUpSchema, signUpSchema } from '@/lib/formSchema/signUp'
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
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema)
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
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 text-end'>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <input
              {...register('firstName')}
              placeholder='First name'
              className='p-3 rounded border-2 border-grey-500 w-full'
            />
            {errors.firstName && (
              <p className='text-left text-error-main'>{`${errors.firstName.message}`}</p>
            )}
          </div>
          <div>
            <input
              {...register('lastName')}
              placeholder='Last name'
              className='p-3 rounded border-2 border-grey-500 w-full'
            />
            {errors.lastName && (
              <p className='text-left text-error-main'>{`${errors.lastName.message}`}</p>
            )}
          </div>
        </div>
        <input
          {...register('email')}
          placeholder='Email'
          className='p-3 rounded border-2 border-grey-500 w-full'
        />
        {errors.email && (
          <p className='text-left text-error-main'>{`${errors.email.message}`}</p>
        )}
        <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
          <input
            {...register('password')}
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

        {errors.password && (
          <p className='text-left text-error-main'>{`${errors.password.message}`}</p>
        )}

        <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
          <input
            {...register('confirmPassword')}
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

        {errors.confirmPassword && (
          <p className='text-left text-error-main'>{`${errors.confirmPassword.message}`}</p>
        )}

        <button
          disabled={isSubmitting}
          type='submit'
          className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
        >
          Login
        </button>
      </form>
    </>
  )
}

export default SignUp
