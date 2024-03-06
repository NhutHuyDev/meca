import { ReactElement } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { CaretLeft, Download, Image } from 'phosphor-react'

import { useAppDispatch } from '@/hooks/redux'
import { updateSidebarType } from '@/redux/slice/app'
import { faker } from '@faker-js/faker'
import { Shared_Links } from '@/data'
import ScrollArea from '../ScrollArea'

function SharedMessage(): ReactElement {
  const dispatch = useAppDispatch()

  return (
    <div className='w-80 h-[100vh] shadow-inner flex flex-col'>
      <div className='p-6 bg-grey-200 text-grey-700 flex items-center gap-16'>
        <button
          onClick={() => {
            dispatch(updateSidebarType({ type: 'CONTACT' }))
          }}
        >
          <CaretLeft size={22} />
        </button>
        <p className='font-bold'>Shared Message</p>
      </div>

      <div className='flex-grow'>
        <ScrollArea maxHeight={'calc(100vh - 72px)'}>
          <div>
            <Tabs.Root defaultValue='tab1'>
              <Tabs.List className='w-3/4 mx-auto flex justify-center space-x-8'>
                <Tabs.Trigger
                  value='tab1'
                  className='flex-1 flex items-center justify-center p-4 pb-2 
                data-[state=active]:text-primary-main 
                data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]'
                >
                  Media
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='tab2'
                  className='flex-1  flex items-center justify-center p-4 pb-2 
                data-[state=active]:text-primary-main
                data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]'
                >
                  Links
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='tab3'
                  className='flex-1 flex items-center justify-center p-4 pb-2 
                data-[state=active]:text-primary-main
                data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]'
                >
                  Docs
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value='tab1'>
                <MediaContent />
              </Tabs.Content>
              <Tabs.Content value='tab2'>
                <LinksContent />
              </Tabs.Content>
              <Tabs.Content value='tab3'>
                <DocsContent />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function MediaContent(): ReactElement {
  return (
    <div className='grid grid-cols-3 gap-3 m-4'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((media: number) => (
        <div key={media} className='grid-cols-1'>
          <img src={faker.image.avatar()} alt='media' />
        </div>
      ))}
    </div>
  )
}

function LinksContent(): ReactElement {
  return (
    <div className='space-y-3 m-4'>
      {Shared_Links.map((links) => (
        <div className='w-full flex justify-start items-center space-x-4'>
          <div
            className='w-12 h-12 rounded-md bg-contain bg-no-repeat bg-center bg-common-white'
            style={{ backgroundImage: `url(${links.preview})` }}
          />
          <div className='col-span-3'>
            <p className='font-semibold'>Enjoy Your Date!</p>
            <span>{links.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function DocsContent(): ReactElement {
  return (
    <div className='space-y-3 m-4'>
      {Shared_Links.map((docs, index) => (
        <div
          key={index}
          className='w-full h-fit flex items-start relative justify-start'
        >
          <div className='rounded-xl p-2 text-grey-700 w-full'>
            <button className='w-full flex justify-around items-center gap-3 bg-common-white p-2 rounded-lg'>
              <Image size={38} />
              <p>finalReport.word</p>
              <Download size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SharedMessage
