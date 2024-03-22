import { ReactElement } from 'react'
import {
  FileMsg,
  ImgMsg,
  LinkMsg,
  // ReplyMsg,
  TextMsg
  // Timeline
} from './MsgTypes'
import ScrollArea from '@/components/ScrollArea'
import { OneToOneMessage } from '@/types/message.types'

export enum messageType {
  Text = 'Text',
  Media = 'Media',
  Document = 'Document',
  Link = 'Link'
}

function Messages({ messages }: { messages: OneToOneMessage[] }): ReactElement {

  if (messages.length === 0) {
    return (
      <p className='text-grey-500 italic mt-auto text-center p-3'>
        Enjoy your converstation
      </p>
    )
  } else {
    return (
      <div className='flex-grow'>
        <ScrollArea maxHeight={'calc(100vh - 140px)'} autoScrollBottom>
          <div className='p-4 flex flex-col gap-3'>
            {messages.map((chat: OneToOneMessage, index) => {
              switch (chat.type) {
                case messageType.Media:
                  return (
                    <ImgMsg
                      key={chat._id}
                      message={chat.text}
                      img={chat.imgUri}
                      // incoming={chat.}
                    />
                  )

                case messageType.Link:
                  return (
                    <LinkMsg
                      key={chat._id}
                      message={chat.text}
                      preview={chat.link}
                      // incoming={chat.incoming}
                    />
                  )

                case messageType.Document:
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
                      senderId={chat.sender}
                      createdAt={chat.createdAt}
                      isLastMessage={messages.length - 1 === index}
                    />
                  )
              }
            })}
          </div>
        </ScrollArea>
      </div>
    )
  }

  // return (
  //   <div className='flex-grow'>
  //     <ScrollArea maxHeight={'calc(100vh - 136px)'} autoScrollBottom>
  //       <div className='p-4 flex flex-col gap-3 items-center'>
  //         {messages.length > 0 ? (
  //           messages.map((chat: OneToOneMessage) => {
  //             switch (chat.type) {
  //               case messageType.Media:
  //                 return (
  //                   <ImgMsg
  //                     key={chat._id}
  //                     message={chat.text}
  //                     img={chat.imgUri}
  //                     // incoming={chat.}
  //                   />
  //                 )

  //               // case 'reply':
  //               //   return (
  //               //     <ReplyMsg
  //               //       key={index}
  //               //       message={chat.message}
  //               //       reply={chat.reply}
  //               //       incoming={chat.incoming}
  //               //     />
  //               //   )

  //               case messageType.Link:
  //                 return (
  //                   <LinkMsg
  //                     key={chat._id}
  //                     message={chat.text}
  //                     preview={chat.link}
  //                     // incoming={chat.incoming}
  //                   />
  //                 )

  //               case messageType.Document:
  //                 return (
  //                   <FileMsg
  //                     key={chat._id}
  //                     message={chat.text}
  //                     // incoming={chat.incoming}
  //                   />
  //                 )

  //               default:
  //                 return (
  //                   <TextMsg
  //                     key={chat._id}
  //                     message={chat.text}
  //                     incoming={chat.sender !== clientId}
  //                     createdAt={chat.createdAt}
  //                   />
  //                 )
  //             }
  //           })
  //         ) : (
  //           <p className='text-grey-500 italic mt-auto'>
  //             Enjoy your converstation
  //           </p>
  //         )}
  //         <p className='text-grey-500 italic mt-auto'>Sent</p>
  //       </div>
  //     </ScrollArea>
  //   </div>
  // )
}

export default Messages
