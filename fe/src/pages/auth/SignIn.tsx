import AuthSocial from '@/components/Auth/AuthSocial'
import SignInForm from '@/form/SignIn'
import Divider from '@/components/ui/Divider'
import { Link } from 'react-router-dom'

function SignIn() {
  return (
    <div className='space-y-3 w-5/6 mx-auto'>
      <div className='space-y-1'>
        <h3 className='text-xl'>
          Login to{' '}
          <span className='font-semibold text-secondary-main'>MECA</span>
        </h3>
        <p className='text-grey-700'>
          New user?{' '}
          <Link
            to={'/auth/sign-up'}
            className='text-secondary-dark hover:underline'
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Sign Up Form  */}
      <SignInForm />

      <Divider rootStyle='my-3'>
        <span className='text-grey-500'>OR</span>
      </Divider>

      {/* Auth Social  */}
      <AuthSocial />
    </div>
  )
}

export default SignIn
