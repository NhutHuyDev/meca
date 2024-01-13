import {
  Bell,
  Camera,
  ChatCircleDots,
  File,
  Gear,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
  Phone,
  SignOut,
  Sticker,
  User,
  Users
} from 'phosphor-react'
import { faker } from '@faker-js/faker'

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />
  },
  {
    index: 1,
    icon: <Users />
  },
  {
    index: 2,
    icon: <Phone />
  }
]

const Chat_List = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: '9:36',
    unread: 0,
    pinned: true,
    online: true
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: '12:02',
    unread: 2,
    pinned: true,
    online: false
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: '10:35',
    unread: 3,
    pinned: false,
    online: true
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: '04:00',
    unread: 0,
    pinned: false,
    online: true
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: '08:42',
    unread: 0,
    pinned: false,
    online: false
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: '08:42',
    unread: 0,
    pinned: false,
    online: false
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: '08:42',
    unread: 0,
    pinned: false,
    online: false
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: '08:42',
    unread: 0,
    pinned: false,
    online: false
  }
]

const Chat_History = [
  {
    type: 'msg',
    message: 'Hi 👋🏻, How are ya ?',
    incoming: true,
    outgoing: false
  },
  {
    type: 'divider',
    text: 'Today'
  },
  {
    type: 'msg',
    message: 'Hi 👋 Panda, not bad, u ?',
    incoming: false,
    outgoing: true
  },
  {
    type: 'msg',
    message: 'Can you send me an abstarct image?',
    incoming: false,
    outgoing: true
  },
  {
    type: 'msg',
    message: 'Ya sure, sending you a pic',
    incoming: true,
    outgoing: false
  },

  {
    type: 'msg',
    subtype: 'img',
    message: 'Here You Go',
    img: 'https://live.staticflickr.com/4210/35051898714_3f15e5c5f2_b.jpg',
    incoming: false,
    outgoing: false
  },
  {
    type: 'msg',
    message: 'Can you please send this in file format?',
    incoming: false,
    outgoing: true
  },
  {
    type: 'msg',
    subtype: 'doc',
    message: 'Yes sure, here you go.',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'link',
    preview: faker.image.cats(),
    message: 'Yep, I can also do that',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'reply',
    reply: 'This is a reply',
    message: 'Yep, I can also do that',
    incoming: false,
    outgoing: true
  }
]

const Chat_Actions = [
  {
    color: '#4da5fe',
    icon: <Image size={24} />,
    y: 102,
    title: 'Photo/Video'
  },
  {
    color: '#1b8cfe',
    icon: <Sticker size={24} />,
    y: 172,
    title: 'Stickers'
  },
  {
    color: '#0172e4',
    icon: <Camera size={24} />,
    y: 242,
    title: 'Image'
  },
  {
    color: '#0159b2',
    icon: <File size={24} />,
    y: 312,
    title: 'Document'
  },
  {
    color: '#013f7f',
    icon: <User size={24} />,
    y: 382,
    title: 'Contact'
  }
]

const Message_options = [
  {
    title: 'Reply'
  },
  {
    title: 'React to message'
  },
  {
    title: 'Forward message'
  },
  {
    title: 'Star message'
  },
  {
    title: 'Report'
  },
  {
    title: 'Delete Message'
  }
]

const Profile_Menu = [
  {
    title: 'Profile',
    icon: <User />
  },
  {
    title: 'Settings',
    icon: <Gear />
  },
  {
    title: 'Profile',
    icon: <SignOut />
  }
]

const Shared_Links = [
  {
    type: 'msg',
    subtype: 'link',
    preview: faker.image.cats(),
    message: 'Yep, I can also do that',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'link',
    preview: faker.image.cats(),
    message: 'Yep, I can also do that',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'link',
    preview: faker.image.cats(),
    message: 'Yep, I can also do that',
    incoming: true,
    outgoing: false
  }
]

const Shared_Docs = [
  {
    type: 'msg',
    subtype: 'doc',
    message: 'Yes sure, here you go.',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'doc',
    message: 'Yes sure, here you go.',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'doc',
    message: 'Yes sure, here you go.',
    incoming: true,
    outgoing: false
  },
  {
    type: 'msg',
    subtype: 'doc',
    message: 'Yes sure, here you go.',
    incoming: true,
    outgoing: false
  }
]

const Setting_List = [
  {
    key: 0,
    icon: <Bell size={20} />,
    title: 'Notifications',
    onclick: () => {}
  },
  {
    key: 1,
    icon: <Lock size={20} />,
    title: 'Privacy',
    onclick: () => {}
  },
  {
    key: 2,
    icon: <Key size={20} />,
    title: 'Security',
    onclick: () => {}
  },
  {
    key: 3,
    icon: <PencilCircle size={20} />,
    title: 'Theme'
  },
  {
    key: 4,
    icon: <Image size={20} />,
    title: 'Chat Wallpaper',
    onclick: () => {}
  },
  {
    key: 5,
    icon: <Note size={20} />,
    title: 'Request Account Info',
    onclick: () => {}
  },
  {
    key: 6,
    icon: <Keyboard size={20} />,
    title: 'Keyboard Shortcuts'
  },
  {
    key: 7,
    icon: <Info size={20} />,
    title: 'Help',
    onclick: () => {}
  }
]

const Shortcut_List = [
  {
    key: 0,
    title: 'Mark as unread',
    combination: ['Cmd', 'Shift', 'U']
  },
  {
    key: 1,
    title: 'Mute',
    combination: ['Cmd', 'Shift', 'M']
  },
  {
    key: 2,
    title: 'Archive Chat',
    combination: ['Cmd', 'Shift', 'E']
  },
  {
    key: 3,
    title: 'Delete Chat',
    combination: ['Cmd', 'Shift', 'D']
  },
  {
    key: 4,
    title: 'Pin Chat',
    combination: ['Cmd', 'Shift', 'P']
  },
  {
    key: 5,
    title: 'Search',
    combination: ['Cmd', 'F']
  },
  {
    key: 6,
    title: 'Search Chat',
    combination: ['Cmd', 'Shift', 'F']
  },
  {
    key: 7,
    title: 'Next Chat',
    combination: ['Cmd', 'N']
  },
  {
    key: 8,
    title: 'Next Step',
    combination: ['Ctrl', 'Tab']
  },
  {
    key: 9,
    title: 'Previous Step',
    combination: ['Ctrl', 'Shift', 'Tab']
  },
  {
    key: 10,
    title: 'New Group',
    combination: ['Cmd', 'Shift', 'N']
  },
  {
    key: 11,
    title: 'Profile & About',
    combination: ['Cmd', 'P']
  },
  {
    key: 12,
    title: 'Increase speed of voice message',
    combination: ['Shift', '.']
  },
  {
    key: 13,
    title: 'Decrease speed of voice message',
    combination: ['Shift', ',']
  },
  {
    key: 14,
    title: 'Settings',
    combination: ['Shift', 'S']
  },
  {
    key: 15,
    title: 'Emoji Panel',
    combination: ['Cmd', 'E']
  },
  {
    key: 16,
    title: 'Sticker Panel',
    combination: ['Cmd', 'S']
  }
]

export {
  Nav_Buttons,
  Chat_List,
  Chat_History,
  Chat_Actions,
  Message_options,
  Profile_Menu,
  Shared_Links,
  Shared_Docs,
  Setting_List,
  Shortcut_List
}
