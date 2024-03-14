import { ReactElement, useEffect, useRef } from 'react'
import {
  FileMsg,
  ImgMsg,
  LinkMsg,
  // ReplyMsg,
  TextMsg
  // Timeline
} from './MsgTypes'
import ScrollArea from '../ScrollArea'
import { useAppSelector } from '@/hooks/redux'
import { OneToOneMessage } from '@/types/message.types'

export enum MessageType {
  Text = 'Text',
  Media = 'Media',
  Document = 'Document',
  Link = 'Link'
}

function Messages({ messages }: { messages: OneToOneMessage[] }): ReactElement {
  const { clientId } = useAppSelector((state) => state.auth)

  const messagesRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesRef.current?.scrollIntoView({ behavior: 'instant' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className='flex-grow'>
      <ScrollArea maxHeight={'calc(100vh - 136px)'} autoScrollBottom>
        <div className='p-4 flex flex-col gap-3 items-center' ref={messagesRef}>
          {messages.length > 0 ? (
            messages.map((chat: OneToOneMessage) => {
              switch (chat.type) {
                case MessageType.Media:
                  return (
                    <ImgMsg
                      key={chat._id}
                      message={chat.text}
                      img={chat.imgUri}
                      // incoming={chat.}
                    />
                  )

                // case 'reply':
                //   return (
                //     <ReplyMsg
                //       key={index}
                //       message={chat.message}
                //       reply={chat.reply}
                //       incoming={chat.incoming}
                //     />
                //   )

                case MessageType.Link:
                  return (
                    <LinkMsg
                      key={chat._id}
                      message={chat.text}
                      preview={chat.link}
                      // incoming={chat.incoming}
                    />
                  )

                case MessageType.Document:
                  return (
                    <FileMsg
                      key={chat._id}
                      message={chat.text}
                      // incoming={chat.incoming}
                    />
                  )

                default:
                  return (
                    <TextMsg
                      key={chat._id}
                      message={chat.text}
                      incoming={chat.sender !== clientId}
                      createdAt={chat.createdAt}
                    />
                  )
              }
            })
          ) : (
            <p className='text-grey-500 italic mt-auto'>
              Enjoy your converstation
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Messages
