import ProfileForm from '@/form/ProfileForm'
import { CaretLeft } from 'phosphor-react'

function Profile() {
  return (
    <div>
      <div className='p-5 h-[100vh] w-80 bg-grey-200 shadow-inner flex flex-col space-y-8'>
        <div className='flex items-center space-x-5'>
          <CaretLeft size={24} />
          <h2 className='font-semibold text-2xl'>Profile</h2>
        </div>

        <ProfileForm />
      </div>
    </div>
  )
}

export default Profile
