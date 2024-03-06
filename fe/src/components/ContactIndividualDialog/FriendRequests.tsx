import { ReactElement, useEffect, useState } from 'react'
import defaultAvatar from '@/assets/default-avatar.svg'
import {
  ContactUser,
  thunkFetchFriendRequests
} from '@/redux/slice/individualContact'
import ScrollArea from '../ScrollArea'
import { diffBetweenDateAndNow } from '@/utils/diffBetweenDates'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  emitAcceptFriendRequestEvent,
  emitRecipientCancelFriendRequest,
  emitSenderCancelFriendRequest
} from '@/realtime/friend.event'

function FriendRequests(): ReactElement {
  const dispatch = useAppDispatch()

  const { friendRequests } = useAppSelector((state) => state.individualContact)

  useEffect(() => {
    dispatch(thunkFetchFriendRequests())
  }, [dispatch])

  const [isSender, setIsSender] = useState<boolean>(false)
  const [requests, setRequests] = useState<FriendRequestPropsType[]>([])

  useEffect(() => {
    let friendRequestsFilter
    if (isSender) {
      friendRequestsFilter = friendRequests?.filter(
        (request: FriendRequestPropsType) => request.isSender
      )
      setRequests(friendRequestsFilter)
    } else {
      friendRequestsFilter = friendRequests?.filter(
        (request: FriendRequestPropsType) => !request.isSender
      )
      setRequests(friendRequestsFilter)
    }
  }, [isSender, friendRequests])

  return (
    <div className='space-y-4'>
      <div className='flex justify-start items-center space-x-2'>
        <div
          className={`${
            !isSender
              ? ' bg-secondary-lighter text-dark-primary-main '
              : ' bg-common-white text-common-black cursor-pointer'
          } rounded-xl p-2 text-sm`}
          onClick={() => {
            setIsSender(false)
          }}
        >
          New Friend Request
        </div>
        <div
          className={`${
            isSender
              ? ' bg-secondary-lighter text-dark-primary-main '
              : ' bg-common-white text-common-black cursor-pointer'
          } rounded-xl p-2 text-sm`}
          onClick={() => {
            setIsSender(true)
          }}
        >
          Your Request
        </div>
      </div>
      <div>
        <ScrollArea maxHeight='150px'>
          <div className='space-y-2'>
            {isSender
              ? requests.map((request) => (
                  <SentFriendRequest
                    key={request._id}
                    _id={request._id}
                    recipient={request.recipient}
                    createdAt={request.createdAt}
                  />
                ))
              : requests.map((request) => (
                  <RequestFriend
                    key={request._id}
                    _id={request._id}
                    sender={request.sender}
                    createdAt={request.createdAt}
                  />
                ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

type FriendRequestPropsType = {
  _id: string
  recipient?: ContactUser
  sender?: ContactUser
  isSender?: boolean
  createdAt: string
}

function SentFriendRequest({
  _id,
  recipient,
  createdAt
}: FriendRequestPropsType) {
  const dispatch = useAppDispatch()

  const recipientAvatar = recipient?.avatar
    ? `url(${recipient?.avatar})`
    : `url(${defaultAvatar})`

  return (
    <div
      className='h-fit p-3 rounded-2xl bg-common-white 
    flex justify-center items-center gap-3 cursor-pointer'
    >
      <div
        className={`flex-shrink-0 h-9 w-9 rounded-full 
        bg-cover bg-no-repeat bg-center
        relative`}
        style={{ backgroundImage: recipientAvatar }}
      ></div>
      <div className='w-full'>
        <div className='w-full flex justify-between px-3'>
          <div className='space-y-2'>
            <h3 className='text-sm font-bold'>
              {recipient?.firstName + ' ' + recipient?.lastName}
            </h3>
            <span>{diffBetweenDateAndNow(createdAt)}</span>
          </div>
          <button
            onClick={() => {
              dispatch(
                emitSenderCancelFriendRequest({
                  friendRequestId: _id
                })
              )
            }}
            className='rounded-full p-2 text-sm italic text-error-dark hover:bg-error-lighter'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function RequestFriend({ _id, sender, createdAt }: FriendRequestPropsType) {
  const senderAvatar = sender?.avatar
    ? `url(${sender.avatar})`
    : `url(${defaultAvatar})`

  const dispatch = useAppDispatch()

  return (
    <div
      className='h-fit p-3 rounded-2xl bg-common-white 
      flex justify-center items-center gap-3 cursor-pointer'
    >
      <div
        className={`flex-shrink-0 h-9 w-9 rounded-full 
          bg-cover bg-no-repeat bg-center
          relative`}
        style={{ backgroundImage: senderAvatar }}
      ></div>
      <div className='w-full'>
        <div className='w-full flex justify-between px-3'>
          <div className='space-y-2'>
            <h3 className='text-sm font-bold'>
              {sender?.firstName + ' ' + sender?.lastName}
            </h3>
            <span className='text-sm italic text-grey-500'>
              {diffBetweenDateAndNow(createdAt)}
            </span>
          </div>

          <div>
            <button
              onClick={() => {
                dispatch(
                  emitAcceptFriendRequestEvent({
                    friendRequestId: _id
                  })
                )
              }}
              className='rounded-full p-2 text-sm italic text-primary-main hover:bg-secondary-lighter'
            >
              accept
            </button>

            <button
              onClick={() => {
                dispatch(
                  emitRecipientCancelFriendRequest({
                    friendRequestId: _id
                  })
                )
              }}
              className='rounded-full p-2 text-sm italic text-error-main hover:bg-error-lighter'
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendRequests
