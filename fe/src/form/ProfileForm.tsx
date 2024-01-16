import { TProfileSchema, profileSchema } from '@/lib/formSchema/profile'
import { useForm, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema)
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
          {...register('name')}
          placeholder='Name'
          className='p-3 rounded border-2 border-grey-300 w-full outline-none'
        />
        <span className='text-grey-500 text-sm text-left inline-block w-full'>
          This name is visible to your contact
        </span>
        {errors.name && (
          <p className='text-left text-error-main'>{`${errors.name.message}`}</p>
        )}

        <textarea
          {...register('about')}
          placeholder='About'
          className='p-3 rounded border-2 border-grey-300 w-full outline-none'
        />
        {errors.about && (
          <p className='text-left text-error-main'>{`${errors.about.message}`}</p>
        )}

        <button
          disabled={isSubmitting}
          type='submit'
          className='bg-secondary-main text-common-white p-4 rounded-lg w-fit px-5 disabled:opacity-75'
        >
          Save
        </button>
      </form>
    </>
  )
}

export default ProfileForm
