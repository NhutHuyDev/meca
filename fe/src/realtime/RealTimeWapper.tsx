import LoadingOverlay from '@/components/LoadingOverlay'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { connectSocket, socket } from '@/socket'
import { ReactElement, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import friendEventHandler from './friend.event/on'
import chatEventHandler from './chat.event/on'
import groupEventHandler from './group.event/on'
import serviceErrorHandler from './serviceErrorEvent'
import { clearChatOneToOneId, thunkFetchChatOneToOnes } from '@/redux/slice/chatOneToOne'
import { clearChatGroupId, thunkFetchGroups } from '@/redux/slice/chatGroup'

function RealTimeWapper({ children }: { children: ReactElement }) {
  const dispatch = useAppDispatch()
  const { clientId, accessToken, isLoggedIn } = useAppSelector(
    (state) => state.auth
  )
  const { open } = useAppSelector((state) => state.loadingOverlay)

  const location = useLocation()

  useEffect(() => {
    const currPathName = location.pathname

    if (currPathName != '/app' && currPathName != '/') {
      dispatch(clearChatOneToOneId())
    }

    if (currPathName != '/group') {
      dispatch(clearChatGroupId())
    }
  }, [location])

  useEffect(() => {
    dispatch(thunkFetchChatOneToOnes())
    dispatch(thunkFetchGroups())

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
