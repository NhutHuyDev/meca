import { TSignInSchema, signInSchema } from '@/lib/formSchema/signIn'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'
import { useAppDispatch } from '@/hooks/redux'
import { thunkSignIn } from '@/redux/slice/auth'

function SignIn() {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: TSignInSchema) => {
    // TODO: submit to server
    // ...
    // await new Promise((resolve) => setTimeout(resolve, 4000))

    console.log(data)

    dispatch(thunkSignIn(data))

    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 text-end'>
        <input
          {...register('credLogin')}
          placeholder='Email'
          className='p-3 rounded border-2 border-grey-500 w-full'
        />
        {errors.credLogin && (
          <p className='text-left text-error-main'>{`${errors.credLogin.message}`}</p>
        )}
        <div className='flex justify-center items-center text-xl p-3 rounded border-2 border-grey-500 focus-within:border-common-black'>
          <input
            {...register('credPassword')}
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

        {errors.credPassword && (
          <p className='text-left text-error-main'>{`${errors.credPassword.message}`}</p>
        )}
        <Link
          to={'/auth/reset-password'}
          className='font-semibold hover:underline inline-block'
        >
          Forgot Password?
        </Link>
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

export default SignIn
