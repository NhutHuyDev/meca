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

const filterUserContacts = (usernameSearch: string, users: TUser[]) => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(usernameSearch.toLowerCase())
  )
}

const filterSelectedUsers = (selectedUsers: string[], users: TUser[]) => {
  return users.filter((user) => selectedUsers.includes(user.id.toString()))
}

export { filterUserContacts, filterSelectedUsers }
export type { TUser }
