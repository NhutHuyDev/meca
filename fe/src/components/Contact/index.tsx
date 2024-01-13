import { useAppDispatch } from '@/hooks/redux'
import { toggleSidebar, updateSidebarType } from '@/redux/slice/app'
import { faker } from '@faker-js/faker'
import {
  Bell,
  Camera,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  X
} from 'phosphor-react'
import { ReactElement } from 'react'
import Divider from '../ui/Divider'
import SwitchUI from '../ui/Switch'
import ScrollArea from '../ScrollArea'
import * as Dialog from '@radix-ui/react-dialog'

function Contact(): ReactElement {
  const dispatch = useAppDispatch()

  return (
    <div className='w-80 h-[100vh] shadow-inner flex flex-col'>
      <div className='p-6 bg-grey-200 text-grey-700 flex justify-between items-center'>
        <p className='font-bold'>Contact Info</p>
        <button
          onClick={() => {
            dispatch(toggleSidebar())
          }}
        >
          <X size={22} />
        </button>
      </div>

      <div className='flex-grow'>
        <ScrollArea maxHeight={'calc(100vh - 72px)'} bgColor='bg-common-white'>
          <div className='p-6 flex flex-col justify-center items-center'>
            <div className='cursor-pointer flex items-center gap-6 w-fit'>
              <div
                className={`flex-shrink-0 h-12 w-12 rounded-full 
                  bg-cover bg-no-repeat bg-center
                  relative after:content-[""] after:block after:h-[10px] after:w-[10px] 
                  after:rounded-full after:bg-success-main after:absolute after:right-0 after:bottom-0 after:shadow'
                  }`}
                style={{ backgroundImage: `url(${faker.image.avatar()}` }}
              ></div>

              <div>
                <h3 className='font-semibold'>Nguyen Nhut Huy</h3>
                <span className='text-grey-700 text-sm'>+84 366 599 225</span>
              </div>
            </div>

            <div className='mt-8 w-3/4 flex justify-around items-center'>
              <div className='flex flex-col justify-center items-center'>
                <Phone size={28} className='text-grey-500' />
                <p>Voice</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <Camera size={28} className='text-grey-500' />
                <span>Video</span>
              </div>
            </div>
          </div>

          <Divider rootStyle='my-2' />

          <div className='p-8 py-2 space-y-3'>
            <h3>About</h3>
            <p className='font-semibold'>Hi there, welcome to my life!</p>
          </div>

          <Divider rootStyle='my-2' />

          <div className='p-6 py-2 space-y-3'>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold p-1'>Media, Link & Docs</h3>
              <button
                className='flex justify-center items-center 
              rounded-xl p-1 hover:bg-secondary-lighter transition-all'
                onClick={() => {
                  dispatch(updateSidebarType({ type: 'SHARED_MESSAGE' }))
                }}
              >
                <span className='text-secondary-main'>401</span>
                <CaretRight />
              </button>
            </div>

            <div className='grid grid-cols-3 gap-2'>
              {[1, 2, 3].map((value) => (
                <div className='grid-cols-1' key={value}>
                  <img src={faker.image.food()} className='rounded-lg' />
                </div>
              ))}
            </div>
          </div>

          <Divider rootStyle='my-2' />

          <div className='px-8 py-2 flex justify-between items-center'>
            <Star />
            <p className='font-semibold'>Starred Messages</p>
            <CaretRight
              className='cursor-pointer'
              onClick={() => {
                dispatch(updateSidebarType({ type: 'STARRED_MESSAGE' }))
              }}
            />
          </div>

          <Divider rootStyle='my-2' />

          <div className='px-8 py-2 flex justify-between items-center'>
            <Bell />
            <p className='font-semibold'>Muted Notifications</p>
            <SwitchUI checked={true} onCheckedChange={() => {}} />
          </div>

          <Divider rootStyle='my-2' />

          <div className='p-8 py-2 flex flex-col gap-4 items-start'>
            <p>1 group in common</p>
            <div className='cursor-pointer flex items-center gap-6 w-fit'>
              <div
                className={`flex-shrink-0 h-12 w-12 rounded-full 
          bg-cover bg-no-repeat bg-center}`}
                style={{ backgroundImage: `url(${faker.image.avatar()}` }}
              ></div>

              <div>
                <h3 className='font-semibold'>Coding Monk</h3>
                <span className='text-grey-700'>Tom, Cris, You</span>
              </div>
            </div>
          </div>

          <Divider rootStyle='my-2' />

          <div className='p-8 py-2 pb-5 flex gap-10 justify-center items-start'>
            <BlockDialog />
            <DeleteDialog />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default Contact

function BlockDialog(): ReactElement {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className='flex items-center gap-2 p-2 ring-warning-main ring-1 rounded-xl text-warning-main hover:opacity-70'>
          <Prohibit size={24} />
          <span>Block</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-dark-common-black opacity-50 fixed inset-0 z-[100]' />
        <Dialog.Content
          className='fixed z-[101] top-[50%] left-[50%] 
        max-h-[85vh] max-w-[450px] rounded-2xl
        overflow-hidden
        bg-common-white
        p-4
        translate-x-[-50%] translate-y-[-50%]   
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]'
        >
          <Dialog.Title className='m-0 text-lg font-medium'>
            Block Contact
          </Dialog.Title>
          <Dialog.Description className='mt-2 mb-5 text-sm text-grey-700'>
            Are you sure you want to block this contact
          </Dialog.Description>
          <div className='mt-[25px] flex justify-between'>
            <Dialog.Close asChild>
              <button className='text-error-main hover:bg-error-lighter items-center justify-center rounded-lg p-2 font-medium'>
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className='text-primary-main hover:bg-secondary-lighter items-center justify-center rounded-lg p-2 px-4 font-medium'>
                Yes
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function DeleteDialog(): ReactElement {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className='flex items-center gap-2 p-2 ring-error-main ring-1 rounded-xl text-error-main hover:opacity-70'>
          <Prohibit size={24} />
          <span>Delete</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-dark-common-black opacity-50 fixed inset-0 z-[100]' />
        <Dialog.Content
          className='fixed z-[101] top-[50%] left-[50%] 
        max-h-[85vh] max-w-[450px] rounded-2xl
        overflow-hidden
        bg-common-white
        p-4
        translate-x-[-50%] translate-y-[-50%]   
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]'
        >
          <Dialog.Title className='m-0 text-lg font-medium'>
            Delete Contact
          </Dialog.Title>
          <Dialog.Description className='mt-2 mb-5 text-sm text-grey-700'>
            Are you sure you want to delete this contact
          </Dialog.Description>
          <div className='mt-[25px] flex justify-between'>
            <Dialog.Close asChild>
              <button className='text-error-main hover:bg-error-lighter items-center justify-center rounded-lg p-2 font-medium'>
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className='text-primary-main hover:bg-secondary-lighter items-center justify-center rounded-lg p-2 px-4 font-medium'>
                Yes
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
