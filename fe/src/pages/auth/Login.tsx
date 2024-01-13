import AuthSocial from '@/components/Auth/AuthSocial'

function login() {
  return (
    <div>
      <div>
        <h3>Login to MECA</h3>
        <p>
          New user? <span>Create an account</span>
        </p>
      </div>
      {/* Login Form  */}
      <div></div>

      <div className='flex gap-2 justify-center items-center'>
        <span
          style={{ height: '1px' }}
          className='block w-full bg-grey-300'
        ></span>
        <span className='text-divider'>OR</span>
        <span
          style={{ height: '1px' }}
          className='block w-full bg-grey-300'
        ></span>
      </div>

      {/* Auth Social  */}
      <AuthSocial />
    </div>
  )
}

export default login
