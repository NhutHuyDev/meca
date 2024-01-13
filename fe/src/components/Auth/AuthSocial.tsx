import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react'

function AuthSocial() {
  return (
    <div className='text-xl space-x-4 text-center'>
      <button>
        <GoogleLogo color='#DF3E30' />
      </button>
      <button>
        <GithubLogo />
      </button>
      <button>
        <TwitterLogo color='#19CCEA'/>
      </button>
    </div>
  )
}

export default AuthSocial
