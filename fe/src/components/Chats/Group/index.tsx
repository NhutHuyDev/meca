import { ReactElement, useState } from 'react'
import { CircleDashed, MagnifyingGlass, Plus, X } from 'phosphor-react'
import ScrollArea from '@/components/ScrollArea'
import Divider from '@/components/ui/Divider'
import * as Dialog from '@radix-ui/react-dialog'
import CreateNewGroupForm from '@/form/CreateNewGroup'
import { useAppSelector } from '@/hooks/redux'
import { ChatGroup } from '@/types/chat.types'
import ChatGroupComponent from './ChatGroupComponent'

function ChatGroup(): ReactElement {
  // const dispatch = useAppDispatch()

  const { chatGroups } = useAppSelector((state) => state.chatGroup)

  // useEffect(() => {
  //   dispatch(thunkFetchGroups())
  // }, [dispatch])

  return (
    <div className='p-2 h-[100vh] bg-grey-200 w-80 flex-shrink-0 shadow-inner flex flex-col'>
      <div className='p-2 flex flex-col space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-3xl'>Groups</h2>
          <CircleDashed size={28} />
        </div>

        <div
          className='flex justify-between items-center gap-2
         text-grey-500 bg-common-white p-3 rounded-2xl text-base'
        >
          <MagnifyingGlass className='text-lg' />
          <input
            disabled
            type='text'
            placeholder='Search...'
            className='flex-grow focus:outline-none'
          />
        </div>

        <div className='space-y-3'>
          <CreateNewGroup />
        </div>
      </div>

      <Divider rootStyle='my-2' />

      <ScrollArea maxHeight='calc(100vh - 200px)'>
        <div className='p-2 h-full space-y-5'>
          <div className='space-y-3'>
            <h3 className='text-grey-600 text-sm'>All Groups</h3>
            {chatGroups
              .filter((group: ChatGroup) => group.pinned !== true)
              .map((group: ChatGroup) => (
                <ChatGroupComponent
                  key={group._id}
                  creator={group.creator}
                  _id={group._id}
                  lastMessage={group.lastMessage}
                  members={group.members}
                  currentUnread={group.currentUnread}
                />
              ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default ChatGroup

function CreateNewGroup(): ReactElement {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className='text-secondary-main hover:text-secondary-dark 
          transition-all font-semibold flex justify-between items-center gap-2 w-full px-4 outline-none'
        >
          <span>Create New Group</span>
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
              Create New Group
            </Dialog.Title>
            <Dialog.Close asChild>
              <button>
                <X />
              </button>
            </Dialog.Close>
          </div>

          <CreateNewGroupForm setOpenDialog={setOpen} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
