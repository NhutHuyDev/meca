import { createSlice } from '@reduxjs/toolkit'

export type OneToOneMessage = {
  sender: string

  recipient: string

  type: string

  chatOneToOne: string

  text?: string

  imgUri?: string

  fileUri?: string

  link?: string

  replyMsg?: string
}

export type TChatOneToOneState = {
  chatOneToOneId: string
  messages: OneToOneMessage[]
}

const initialState: TChatOneToOneState = {
  chatOneToOneId: '',
  messages: []
}

const slice = createSlice({
  name: 'chatOneToOne',
  initialState,
  reducers: {
    setChatOneToOneId(state, action) {
      state.chatOneToOneId = action.payload.chatOneToOneId
    }
  }
})

export const { setChatOneToOneId } = slice.actions

export default slice.reducer
