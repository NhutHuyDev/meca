import { ContactUser } from '@/types/user.types'

type TUser = {
  id: number
  img?: string
  name: string
  msg?: string
  time?: string
  unread?: number
  pinned?: boolean
  online?: boolean
}

const filterUserContacts = (usernameSearch: string, users: ContactUser[]) => {
  return users.filter((user) => {
    const name = user.firstName + ' ' + user.lastName
    name.toLowerCase().includes(usernameSearch.toLowerCase())
  })
}

const filterSelectedUsers = (selectedUsers: string[], users: ContactUser[]) => {
  return users.filter((user) => selectedUsers.includes(user._id.toString()))
}

export { filterUserContacts, filterSelectedUsers }
export type { TUser }
