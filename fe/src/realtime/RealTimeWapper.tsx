import LoadingOverlay from '@/components/LoadingOverlay'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { connectSocket, socket } from '@/socket'
import { ReactElement, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import friendEventHandler from './friend.event/on'
import chatEventHandler from './chat.event/on'
import groupEventHandler from './group.event/on'
import serviceErrorHandler from './serviceErrorEvent'

function RealTimeWapper({ children }: { children: ReactElement }) {
  const dispatch = useAppDispatch()
  const { clientId, accessToken, isLoggedIn } = useAppSelector(
    (state) => state.auth
  )
  const { open } = useAppSelector((state) => state.loadingOverlay)

  useEffect(() => {
    if (!socket || !socket.connected) {
      connectSocket(accessToken, clientId)

      dispatch(friendEventHandler())

      dispatch(chatEventHandler())

      dispatch(groupEventHandler())

      dispatch(serviceErrorHandler())
    }

    window.addEventListener('beforeunload', () => {
      socket.emit('end')
    })

    return () => {
      window.removeEventListener('beforeunload', () => {
        socket.emit('end')
      })
    }
  }, [accessToken, clientId, dispatch])

  return (
    <>
      {isLoggedIn ? (
        <>
          <LoadingOverlay open={open} />
          {children}
        </>
      ) : (
        <Navigate to='/auth/sign-in' replace />
      )}
    </>
  )
}

export default RealTimeWapper
