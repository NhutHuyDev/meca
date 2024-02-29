import { Outlet } from 'react-router-dom'
import logo2 from '@/assets/icon-2.png'

function SecondaryLayout() {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center'>
      <div className='pt-28 space-y-6 w-2/5'>
        <img
          src={logo2}
          alt='logo'
          className='w-24 h-auto rounded-lg mx-auto'
        />
        <Outlet />
      </div>
    </div>
  )
}

export default SecondaryLayout
