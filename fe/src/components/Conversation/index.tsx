import { ReactElement } from 'react'
import Header from './Header'
import Footer from './Footer'
import Messages from './Messages'
import logoUri from '@/assets/logo.png'
import { useAppSelector } from '@/hooks/redux'

function Converstation(): ReactElement {
  const { chatOneToOneId } = useAppSelector((state) => state.chatOneToOne)

  return (
    <div className='h-[100vh] flex-grow shadow-inner'>
      <div className='flex flex-col w-full h-full'>
        {chatOneToOneId != '' ? (
          <>
            <Header />
            <Messages />
            <Footer />
          </>
        ) : (
          <EmptyMessages />
        )}
      </div>
    </div>
  )
}

function EmptyMessages(): ReactElement {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col justify-center space-y-4 mt-44'>
        <img src={logoUri} className='w-72 rounded-xl mx-auto' />
        <h2 className='font-semibold italic text-xl text-grey-400'>
          Select Chat To Start Your Converstation!
        </h2>
      </div>
    </div>
  )
}

export default Converstation
