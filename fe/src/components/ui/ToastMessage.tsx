import { useAppDispatch } from '@/hooks/redux'
import { closeMessageToast } from '@/redux/slice/messageToast'
import * as Toast from '@radix-ui/react-toast'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'

function ToastMessage({ open, message }: { open: boolean; message: string }) {
  const dispatch = useAppDispatch()
  const [isOpen, setOpen] = useState(open)
  const [toastMsg, setMessage] = useState(message)

  useEffect(() => {
    setOpen(open)
    setMessage(message)
  }, [open, message])

  useEffect(() => {
    if (!isOpen) {
      dispatch(closeMessageToast())
    }
  }, [dispatch, isOpen])

  return (
    <Toast.Provider swipeDirection='right'>
      <Toast.Root
        className='ToastRoot flex items-center justify-between p-3 px-4 bg-dark-primary-main text-common-white rounded-md shadow-sm'
        open={isOpen}
        onOpenChange={setOpen}
      >
        <div>
          <Toast.Title className='text-grey-600 font-semibold'>
            Notification
          </Toast.Title>
          <Toast.Description className='text-grey-700 italic text-sm'>
            {toastMsg}
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
