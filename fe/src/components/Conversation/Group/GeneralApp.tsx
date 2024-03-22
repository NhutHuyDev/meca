import { ReactElement } from 'react'
import Chats from '@/components/Chats/Individual'
import Conversation from '@/components/Conversation/Individual'
import Contact from '@/components/Contact'
import SharedMessage from '@/components/Contact/SharedMessage'
import StarredMessage from '@/components/Contact/StarredMessage'
import { useAppSelector } from '@/hooks/redux'

const GeneralApp = (): ReactElement => {
  const { sidebar } = useAppSelector((store) => store.app)

  return (
    <>
      <Chats />
      <Conversation />
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case 'CONTACT':
              return <Contact />

            case 'STARRED_MESSAGE':
              return <StarredMessage />

            case 'SHARED_MESSAGE':
              return <SharedMessage />

            default:
              break
          }
        })()}
    </>
  )
}

export default GeneralApp
