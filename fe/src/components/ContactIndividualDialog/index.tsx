import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import FriendRequests from './FriendRequests'
import Friends from './Friends'
import OtherUsers from './OtherUsers'

type propsType = {
  open: boolean
  handleCloseDialog: () => void
}

function FriendsDialog({ open, handleCloseDialog }: propsType) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal container={document.getElementById('root')}>
        <Dialog.Overlay className='bg-dark-common-black opacity-50 fixed inset-0 z-[100]' />
        <Dialog.Content
          className='fixed z-[101] top-[50%] left-[50%] rounded-2xl
          overflow-hidden
          bg-grey-200
          p-4
          w-[34rem]
          translate-x-[-50%] translate-y-[-50%]   
          shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]'
          onPointerDownOutside={() => handleCloseDialog()}
        >
          <div className='grid grid-cols-2 gap-3 gap-x-6'></div>

          <div>
            <Tabs.Root defaultValue='tab1'>
              <Tabs.List className='w-full mx-auto flex justify-center space-x-4 bg-grey-300 rounded-tl-lg rounded-tr-lg'>
                <Tabs.Trigger
                  value='tab1'
                  className='flex-1 flex items-center justify-center p-4 pb-2 
                data-[state=active]:text-primary-main 
                data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] outline-none'
                >
                  Explore
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='tab2'
                  className='flex-1  flex items-center justify-center p-4 pb-2 
                data-[state=active]:text-primary-main
                data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] outline-none'
                >
                  Friends
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='tab3'
                  className='flex-1 flex items-center justify-center p-4 pb-2 
                data-[state=active]:text-primary-main
                data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] outline-none'
                >
                  Friend Request
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value='tab1' className='outline-none'>
                <OtherUsers />
              </Tabs.Content>
              <Tabs.Content value='tab2' className='outline-none'>
                <Friends />
              </Tabs.Content>
              <Tabs.Content value='tab3' className='outline-none'>
                <div className='p-4'>
                  <FriendRequests />
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
          <div
            className='mt-[25px] flex justify-end'
            onClick={() => handleCloseDialog()}
          >
            <button className='outline-none text-primary-main hover:bg-secondary-lighter items-center justify-center rounded-lg p-2 px-4 font-medium'>
              Ok
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FriendsDialog
