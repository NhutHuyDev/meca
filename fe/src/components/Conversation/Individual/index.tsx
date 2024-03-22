import { ReactElement, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Messages from './Messages'
import logoUri from '@/assets/logo.png'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { clearUnread, thunkGetChatDetail } from '@/redux/slice/chatOneToOne'
import ChatEventEmit from '@/realtime/chat.event/emit'

function Converstation(): ReactElement {
  const dispatch = useAppDispatch()

  const { chatOneToOneId, currentFrom, messages, currentIsFriend } =
    useAppSelector((state) => state.chatOneToOne)

  const { clientId } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (chatOneToOneId !== '') {
      dispatch(
        clearUnread({
          chatOneToOneId: chatOneToOneId
        })
      )
      dispatch(
        ChatEventEmit.clear_unread({
          chatOneToOneId,
          currentId: clientId
        })
      )
      dispatch(thunkGetChatDetail(chatOneToOneId))
    }
  }, [dispatch, chatOneToOneId, clientId])

  return (
    <div className='h-[100vh] flex-grow shadow-inner'>
      <div className='flex flex-col w-full h-full'>
        {currentFrom && chatOneToOneId !== '' ? (
          <>
            <Header currentFrom={currentFrom} />
            <Messages messages={messages} />
            {currentIsFriend ? (
              <Footer
                currentFrom={currentFrom}
                chatOneToOneId={chatOneToOneId}
              />
            ) : (
              <div className='bg-grey-200 h-fit w-full px-3 py-4 flex justify-center gap-3 relative z-[99] shadow-inner'>
                <p className='text-center text-grey-500'> 
                  Unable to send messages to unfriended users
                </p>
              </div>
            )}
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
