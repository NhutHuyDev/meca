import { ReactElement, useEffect } from 'react'
import defaultAvatar from '@/assets/default-avatar.png'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { thunkFetchOthers } from '@/redux/slice/individualContact'
import ScrollArea from '../ScrollArea'
import FriendEventEmit from '@/realtime/friend.event/emit'
import { PopoverUI, side } from '../ui/Popover'
import { ContactUser } from '@/types/user.types'

function OtherUsers() {
  const dispatch = useAppDispatch()

  const { others } = useAppSelector((state) => state.individualContact)

  useEffect(() => {
    dispatch(thunkFetchOthers())
  }, [dispatch])

  return (
    <ScrollArea maxHeight={'150px'}>
      {others.length > 0 ? (
        <div className='p-4 space-y-2'>
          {others.map((other: ContactUser) => (
            <OtherUser key={other._id} {...other} />
          ))}
        </div>
      ) : (
        <div className='mt-5'>
          <p className='text-grey-500 italic text-center text-sm'>Empty</p>
        </div>
      )}
    </ScrollArea>
  )
}

export default OtherUsers

type PropsType = {
  _id: string
  avatar?: string
  firstName: string
  lastName: string
  online?: boolean
  isFriend?: boolean
  isSentFriendRequest?: boolean
  wantToMakeFriend?: boolean
  friendshipRequestId?: string
}

function OtherUser({
  _id,
  avatar,
  firstName,
  lastName,
  online,
  isFriend,
  isSentFriendRequest,
  wantToMakeFriend,
  friendshipRequestId
}: PropsType): ReactElement {
  const avatarUri = avatar ? `url(${avatar})` : `url(${defaultAvatar})`
  const { clientId } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  return (
    <div
      className='h-fit p-3 rounded-2xl bg-common-white 
    flex justify-center items-center gap-3 cursor-pointer'
    >
      <div
        className={`flex-shrink-0 h-9 w-9 rounded-full 
        bg-cover bg-no-repeat bg-center
        relative  
        ${
          online &&
          ' after:content-[""] after:block after:h-[10px] after:w-[10px]' +
            ' after:rounded-full after:bg-success-main' +
            ' after:absolute after:right-0 after:bottom-0 after:shadow'
        }`}
        style={{ backgroundImage: avatarUri }}
      ></div>
      <div className='w-full'>
        <div className='w-full flex items-center px-1 justify-between'>
          <h3 className='text-sm font-bold'>{firstName + ' ' + lastName}</h3>
          {!isFriend && !isSentFriendRequest && !wantToMakeFriend && (
            <button
              className='text-sm italic p-2 rounded-full outline-none text-primary-main hover:bg-secondary-lighter'
              onClick={() => {
                dispatch(
                  FriendEventEmit.send_request({
                    fromId: clientId,
                    toId: _id
                  })
                )
              }}
            >
              add friend
            </button>
          )}

          {!isFriend && isSentFriendRequest && (
            <p className='text-sm italic text-grey-500'>sent friend request</p>
          )}

          {!isFriend && wantToMakeFriend && friendshipRequestId && (
            <PopoverUI
              side={side.right}
              Trigger={
                <button className='flex p-2 rounded-full hover:bg-grey-300 items-center text-sm italic text-grey-500'>
                  want to make friend
                </button>
              }
              Content={
                <FriendRequestOption friendRequestId={friendshipRequestId} />
              }
            />
          )}

          {isFriend && <p className='text-sm italic text-grey-500'>friend</p>}
        </div>
      </div>
    </div>
  )
}

function FriendRequestOption({
  friendRequestId
}: {
  friendRequestId: string
}): ReactElement {
  const dispatch = useAppDispatch()

  const { clientId } = useAppSelector((state) => state.auth)

  return (
    <div className='m-2 p-2 shadow-xl bg-grey-100 rounded-xl w-fix'>
      <button
        onClick={() => {
          dispatch(
            FriendEventEmit.accept_request({
              recipientId: clientId,
              requestId: friendRequestId
            })
          )
        }}
        className='w-full p-1 hover:bg-secondary-lighter outline-none rounded-lg flex items-center space-x-2'
      >
        <p className='text-start text-sm text-primary-main whitespace-nowrap'>
          accept
        </p>
      </button>
      <button
        onClick={() => {
          dispatch(
            FriendEventEmit.reject_request({
              recipientId: clientId,
              requestId: friendRequestId
            })
          )
        }}
        className='w-full p-1 hover:bg-error-lighter outline-none rounded-lg flex items-center space-x-2'
      >
        <p className='text-start text-sm text-error-main whitespace-nowrap'>
          delete
        </p>
      </button>
    </div>
  )
}
