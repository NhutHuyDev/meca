import { Shortcut_List } from '@/data'
import * as Dialog from '@radix-ui/react-dialog'

type propsType = {
  open: boolean
  handleCloseDialog: () => void
}

function ShortcutDialog({ open, handleCloseDialog }: propsType) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-dark-common-black opacity-50 fixed inset-0 z-[100]' />
        <Dialog.Content
          className='fixed z-[101] top-[50%] left-[50%] rounded-2xl
          overflow-hidden
          bg-common-white
          p-4
          w-[60rem]
          translate-x-[-50%] translate-y-[-50%]   
          shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]'
          onPointerDownOutside={() => handleCloseDialog()}
        >
          <Dialog.Title className='m-0 text-lg font-medium mb-3'>
            Keyboard Shortcuts
          </Dialog.Title>

          <div className='grid grid-cols-2 gap-3 gap-x-6'>
            {Shortcut_List.map((shortCut) => {
              return (
                <div className='col-span-1 flex justify-between items-center space-x-5'>
                  <p>{shortCut.title}</p>
                  <div className='flex gap-2 justify-end'>
                    {shortCut.combination.map((key) => (
                      <span className='w-14 text-center col-span-1 p-2 rounded-lg bg-grey-200 text-grey-500'>
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
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

export default ShortcutDialog
