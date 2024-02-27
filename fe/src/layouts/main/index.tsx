import { Navigate, Outlet } from 'react-router-dom'
import logo2 from '@/assets/icon-2.png'
import { useAppSelector } from '@/hooks/redux'

function MainLayout() {
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  if (isLoggedIn) {
    return <Navigate to='/app' />
  }

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center'>
      <div className='pt-20 space-y-6 w-1/3'>
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

export default MainLayout
