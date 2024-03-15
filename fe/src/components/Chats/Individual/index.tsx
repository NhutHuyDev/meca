import { ReactElement, useEffect, useState } from 'react'
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users
} from 'phosphor-react'
import Chat from './Chat'
import ScrollArea from '@/components/ScrollArea'
import Divider from '@/components/ui/Divider'
import ContactIndividualDialog from '@/components/ContactIndividualDialog'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { thunkFetchChatOneToOnes } from '@/redux/slice/chatOneToOne'
import { ChatOneToOne } from '@/types/chat.types'

function ChatIndividual(): ReactElement {
  const dispatch = useAppDispatch()

  const [openFriends, setOpenFriends] = useState(false)

  useEffect(() => {
    dispatch(thunkFetchChatOneToOnes())
  }, [dispatch])

  const { chatOneToOnes } = useAppSelector((state) => state.chatOneToOne)

  return (
    <>
      <div className='p-2 h-[100vh] w-80 bg-grey-200 shadow-inner flex flex-col'>
        <div className='p-2 flex flex-col space-y-6'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-3xl'>Chats</h2>
            <div className='flex items-center space-x-6'>
              <Users
                size={24}
                className='cursor-pointer'
                onClick={() => {
                  setOpenFriends((prev) => !prev)
                }}
              />
              <CircleDashed size={24} />
            </div>
          </div>

          <div
            className='flex justify-between items-center gap-2
         text-grey-500 bg-common-white p-3 rounded-2xl text-base'
          >
            <MagnifyingGlass className='text-lg' />
            <input
              type='text'
              placeholder='Search...'
              className='flex-grow focus:outline-none'
            />
          </div>

          <div className='space-y-3'>
            <button
              className='text-secondary-main hover:text-secondary-dark 
          transition-all font-semibold flex justify-start items-center gap-2'
            >
              <ArchiveBox size={24} className='text-common-black' />
              <span>Archive</span>
            </button>
          </div>
        </div>

        <Divider rootStyle='my-2' />

        <ScrollArea maxHeight='calc(100vh - 200px)'>
          <div className='p-2 h-full space-y-5'>
            {/* <div className='space-y-3'>
              <h3 className='text-grey-600 text-sm'>Pinned</h3>
              {Chat_List.filter((chat) => chat.pinned === true).map((chat) => (
                <Chat
                  key={chat.id}
                  id={String(chat.id)}
                  img={chat.img}
                  msg={chat.msg}
                  name={chat.name}
                  online={chat.online}
                  time={chat.time}
                  unread={chat.unread}
                />
              ))}
            </div> */}
            <div className='space-y-3'>
              <h3 className='text-grey-600 text-sm'>All Chats</h3>
              {chatOneToOnes
                .filter((chat: ChatOneToOne) => !chat.pinned)
                .map((chat: ChatOneToOne) => (
                  <Chat
                    key={chat._id}
                    id={String(chat._id)}
                    avatar={chat.from.avatar}
                    lastMessage={chat.lastMessage}
                    firstName={chat.from.firstName}
                    isFriend={chat.isFriend}
                    lastName={chat.from.lastName}
                    online={chat.from.online}
                    time={chat.lastMessage?.createdAt}
                    unread={chat.unread}
                  />
                ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      <ContactIndividualDialog
        open={openFriends}
        handleCloseDialog={() => {
          setOpenFriends(false)
        }}
      />
    </>
  )
}

export default ChatIndividual
