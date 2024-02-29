import VerifyEmailForm from '@/form/VerifyEmail'
import { Link } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'

function VerifyEmail() {
  return (
    <div className='space-y-3 w-5/6 mx-auto'>
      <div className='space-y-1'>
        <h3 className='text-2xl font-semibold'>Verify email</h3>
        <p className='text-grey-500'>
          please enter the OTP to verify your email.
        </p>
      </div>

      <VerifyEmailForm />

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

export default VerifyEmail
