import { ReactElement } from 'react'
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react'
import Chat from './Chat'
import { Chat_List } from '@/data'
import ScrollArea from '../ScrollArea'

function index(): ReactElement {
  return (
    <div className='p-2 h-[100vh] w-80 bg-grey-200 shadow-inner flex flex-col'>
      <div className='p-2 flex flex-col space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-3xl'>Chats</h2>
          <CircleDashed size={28} />
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

          <span
            style={{ height: '1px' }}
            className='block w-full bg-divider'
          ></span>
        </div>
      </div>

      <ScrollArea maxHeight='calc(100vh - 200px)' bgColor='bg-grey-200'>
        <div className='p-2 h-full space-y-5'>
          <div className='space-y-3'>
            <h3 className='text-grey-600 text-sm'>Pinned</h3>
            {Chat_List.filter((chat) => chat.pinned === true).map((chat) => (
              <Chat
                key={chat.id}
                img={chat.img}
                msg={chat.msg}
                name={chat.name}
                online={chat.online}
                time={chat.time}
                unread={chat.unread}
              />
            ))}
          </div>
          <div className='space-y-3'>
            <h3 className='text-grey-600 text-sm'>All Chats</h3>
            {Chat_List.filter((chat) => chat.pinned === false).map((chat) => (
              <Chat
                key={chat.id}
                img={chat.img}
                msg={chat.msg}
                name={chat.name}
                online={chat.online}
                time={chat.time}
                unread={chat.unread}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default index
