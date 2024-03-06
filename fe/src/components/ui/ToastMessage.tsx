import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { closeMessageToast } from '@/redux/slice/messageToast'
import * as Toast from '@radix-ui/react-toast'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'

function ToastMessage() {
  const dispatch = useAppDispatch()
  const { open, message } = useAppSelector((state) => state.messageToast)
  const [isOpen, setOpen] = useState(open)

  useEffect(() => {
    setOpen(open)
  }, [open])

  useEffect(() => {
    if (!isOpen) {
      const timeoutId = setTimeout(() => {
        dispatch(closeMessageToast())
      }, 4000)
      return () => clearTimeout(timeoutId)
    }
  }, [dispatch, isOpen])

  return (
    <Toast.Provider swipeDirection='right' duration={4000}>
      <Toast.Root
        className='ToastRoot flex items-center justify-between p-3 px-6 bg-dark-primary-main text-common-white rounded-md shadow-sm'
        open={isOpen}
        onOpenChange={setOpen}
      >
        <div>
          <Toast.Title className='text-grey-600 font-semibold'>
            Notification
          </Toast.Title>
          <Toast.Description className='text-grey-700 italic text-sm'>
            {message}
          </Toast.Description>
        </div>
        <Toast.Action asChild altText='Goto schedule to undo'>
          <button>
            <X className='text-grey-600' />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className='ToastViewport' />
    </Toast.Provider>
  )
}

export default ToastMessage
