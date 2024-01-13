import {
  TResetPasswordSchema,
  resetPasswordSchema
} from '@/lib/formSchema/resetPassword'
import { useForm, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema)
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
        <input
          {...register('email')}
          placeholder='Email'
          className='p-3 rounded border-2 border-grey-500 w-full'
        />
        {errors.email && (
          <p className='text-left text-error-main'>{`${errors.email.message}`}</p>
        )}

        <button
          disabled={isSubmitting}
          type='submit'
          className='bg-common-black text-common-white p-4 rounded-lg w-full disabled:opacity-75'
        >
          Send Request
        </button>
      </form>
    </>
  )
}

export default ResetPassword
