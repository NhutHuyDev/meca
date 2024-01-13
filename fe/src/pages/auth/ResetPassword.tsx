import ResetPasswordForm from '@/form/ResetPassword'
import { Link } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'

function ResetPassword() {
  return (
    <div className='space-y-3 w-5/6 mx-auto'>
      <div className='space-y-1'>
        <h3 className='text-2xl font-semibold'>Forgot Your Passwork</h3>
        <p className='text-grey-500'>
          please enter the email associated with your account and we will email
          you a link to reset your password.
        </p>
      </div>

      {/* Sign Up Form  */}
      <ResetPasswordForm />

      <Link
        to={'/auth/sign-in'}
        className='flex justify-start items-center text-grey-600 hover:underline'
      >
        <CaretLeft />
        Back to Sign In
      </Link>
    </div>
  )
}

export default ResetPassword
