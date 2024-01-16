import { Navigate, Outlet } from 'react-router-dom'
import logo from '@/assets/logo.png'

const isAuthenticated = true

function MainLayout() {
  if (isAuthenticated) {
    return <Navigate to='/app' />
  }

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center'>
      <div className='pt-20 space-y-6 w-1/3'>
        <img src={logo} alt='logo' className='w-24 h-auto rounded-lg mx-auto' />
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
