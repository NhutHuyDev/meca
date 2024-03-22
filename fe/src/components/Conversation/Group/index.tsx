import { ReactElement, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Messages from './Messages'
import logoUri from '@/assets/logo.png'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { clearUnread, thunkGetGroupDetail } from '@/redux/slice/chatGroup'
import GroupEventEmit from '@/realtime/group.event/emit'
// import ChatEventEmit from '@/realtime/chat.event/emit'

function Converstation(): ReactElement {
  const dispatch = useAppDispatch()

  const { chatGroupId, currentFroms, messages } = useAppSelector(
    (state) => state.chatGroup
  )

  const { clientId } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (chatGroupId !== '') {
      dispatch(
        clearUnread({
          groupId: chatGroupId
        })
      )
      dispatch(
        GroupEventEmit.clear_unread({
          groupId: chatGroupId,
          currentId: clientId
        })
      )
      dispatch(thunkGetGroupDetail(chatGroupId))
    }
  }, [dispatch, chatGroupId, clientId])

  return (
    <div className='h-[100vh] flex-grow shadow-inner'>
      <div className='flex flex-col w-full h-full'>
        {currentFroms && chatGroupId !== '' ? (
          <>
            <Header currentFroms={currentFroms} />
            <Messages messages={messages} />
            <Footer groupId={chatGroupId} />
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
