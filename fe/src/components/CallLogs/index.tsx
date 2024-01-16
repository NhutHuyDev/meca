import { ChangeEvent, ReactElement, useState } from 'react'
import { CircleDashed, MagnifyingGlass, Plus, X } from 'phosphor-react'
import CallLog from './CallLog'
import { Chat_List } from '@/data'
import ScrollArea from '@/components/ScrollArea'
import Divider from '@/components/ui/Divider'
import * as Dialog from '@radix-ui/react-dialog'
import CallSelection from './CallSelection'
import { filterUserContacts } from '@/utils'

function CallLogs(): ReactElement {
  return (
    <div className='p-2 h-[100vh] w-80 bg-grey-200 shadow-inner flex flex-col'>
      <div className='p-2 flex flex-col space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-3xl'>Call Logs</h2>
          <CircleDashed size={28} />
        </div>

        <div
          className='flex justify-between items-center gap-2
         text-grey-500 bg-common-white p-3 rounded-2xl text-base'
        >
          <MagnifyingGlass className='text-lg' />
          <input
            type='text'
            placeholder='Search logs...'
            className='flex-grow focus:outline-none'
          />
        </div>

        <div className='space-y-3'>
          <CreateCall />
        </div>
      </div>

      <Divider rootStyle='my-2' />

      <ScrollArea maxHeight='calc(100vh - 200px)'>
        <div className='p-2 h-full space-y-5'>
          <div className='space-y-3'>
            <h3 className='text-grey-600 text-sm'>All Groups</h3>
            {Chat_List.map((chat) => (
              <CallLog
                key={chat.id}
                img={chat.img}
                name={chat.name}
                online={chat.online}
                time={chat.time}
                missed={false}
                incomming={false}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default CallLogs

function CreateCall(): ReactElement {
  const [open, setOpen] = useState(false)
  const [searchContact, setSearchContact] = useState('')

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className='text-secondary-main hover:text-secondary-dark 
          transition-all font-semibold flex justify-between items-center gap-2 w-full px-4 outline-none'
        >
          <span>Start Conversation</span>
          <Plus size={16} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-dark-common-black opacity-50 fixed inset-0 z-[100]' />
        <Dialog.Content
          className='fixed z-[101] top-[50%] left-[50%] 
        w-auto h-auto rounded-2xl
        overflow-hidden
        bg-common-white
        p-4
        translate-x-[-50%] translate-y-[-50%]   
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]'
        >
          <div className='flex justify-between items-center'>
            <Dialog.Title className='m-0 text-lg font-medium'>
              Start Call
            </Dialog.Title>
            <Dialog.Close asChild>
              <button>
                <X />
              </button>
            </Dialog.Close>
          </div>
          <div className='w-[300px]'>
            <input
              placeholder='Search your contact ...'
              value={searchContact}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearchContact(e.target.value)
              }}
              className='p-3 rounded-2xl border-2 border-grey-500 w-full outline-none my-3'
            />
            <ScrollArea maxHeight='250px'>
              <div className='ps-2 h-full space-y-1'>
                {filterUserContacts(searchContact, Chat_List).map((user) => (
                  <CallSelection
                    key={user.id}
                    name={user.name}
                    img={user.img}
                    online={user.online}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
