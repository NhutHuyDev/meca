import { Outlet } from 'react-router-dom'
import logo from '@/assets/logo.png'

function MainLayout() {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center'>
      <div className='pt-20 space-y-10 w-1/3'>
        <img src={logo} alt='logo' className='w-24 h-auto rounded-lg mx-auto' />
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
