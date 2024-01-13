import { ReactElement } from 'react'
import Header from './Header'
import Footer from './Footer'
import Messages from './Messages'

function index(): ReactElement {
  return (
    <div className='h-[100vh] flex-grow shadow-inner'>
      <div className='flex flex-col w-full h-full'>
        {/* Header  */}
        <Header />

        {/* Messages  */}
        <Messages />

        {/* Footer  */}
        <Footer />
      </div>
    </div>
  )
}

export default index
