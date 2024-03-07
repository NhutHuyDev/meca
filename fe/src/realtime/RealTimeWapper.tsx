import LoadingOverlay from '@/components/LoadingOverlay'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { connectSocket, socket } from '@/socket'
import { ReactElement, useEffect } from 'react'
import {
  listenAcceptedFriendRequestResponse,
  listenFrientRequestSent,
  listenNewFriendRequest,
  listenRecipientCancelFriendRequestResponse,
  listenSenderCancelFriendRequestResponse,
  listenUnFriendRequestResponse
} from './friend.event'
import { listenNewMessage } from './chat.event/on.event'

function RealTimeWapper({ children }: { children: ReactElement }) {
  const dispatch = useAppDispatch()
  const { isLoggedIn, clientId } = useAppSelector((state) => state.auth)
  const { open } = useAppSelector((state) => state.loadingOverlay)

  useEffect(() => {
    console.log('::socket: ', socket)

    if ((!socket || (socket && !socket.connected)) && clientId && isLoggedIn) {
      connectSocket(clientId)

      dispatch(listenFrientRequestSent())
      dispatch(listenNewFriendRequest())

      dispatch(listenAcceptedFriendRequestResponse())

      dispatch(listenSenderCancelFriendRequestResponse())
      dispatch(listenRecipientCancelFriendRequestResponse())

      dispatch(listenUnFriendRequestResponse())

      dispatch(listenNewMessage())
    }

    window.addEventListener('beforeunload', () => {
      socket.emit('end', { userId: clientId })
    })

    return () => {
      window.removeEventListener('beforeunload', () => {
        socket.emit('end', { userId: clientId })
      })
    }
  }, [clientId, isLoggedIn, dispatch])

  return (
    <>
      <LoadingOverlay open={open} />
      {children}
    </>
  )
}

export default RealTimeWapper
