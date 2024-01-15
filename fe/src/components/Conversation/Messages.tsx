import { Chat_History } from '@/data'
import { ReactElement } from 'react'
import {
  FileMsg,
  ImgMsg,
  LinkMsg,
  ReplyMsg,
  TextMsg,
  Timeline
} from './MsgTypes'
import ScrollArea from '../ScrollArea'

function Messages(): ReactElement {
  return (
    <div className='flex-grow'>
      <ScrollArea maxHeight={'calc(100vh - 136px)'}>
        <div className='p-4 flex flex-col gap-3'>
          {Chat_History.map((chat, index) => {
            switch (chat.type) {
              case 'divider':
                return <Timeline key={index} text={chat.text} />

              case 'msg':
                switch (chat.subtype) {
                  case 'img':
                    return (
                      <ImgMsg
                        key={index}
                        message={chat.message}
                        img={chat.img}
                        incoming={chat.incoming}
                      />
                    )

                  case 'reply':
                    return (
                      <ReplyMsg
                        key={index}
                        message={chat.message}
                        reply={chat.reply}
                        incoming={chat.incoming}
                      />
                    )

                  case 'link':
                    return (
                      <LinkMsg
                        key={index}
                        message={chat.message}
                        preview={chat.preview}
                        incoming={chat.incoming}
                      />
                    )

                  case 'doc':
                    return (
                      <FileMsg
                        key={index}
                        message={chat.message}
                        incoming={chat.incoming}
                      />
                    )

                  default:
                    return (
                      <TextMsg
                        key={index}
                        message={chat.message}
                        incoming={chat.incoming}
                      />
                    )
                }

              default:
                break
            }
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Messages
