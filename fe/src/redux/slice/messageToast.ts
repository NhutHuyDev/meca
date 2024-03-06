import { createSlice } from '@reduxjs/toolkit'

type TMessageState = {
  open: boolean
  message: string
}

const initialState: TMessageState = {
  open: false,
  message: ''
}

const slice = createSlice({
  name: 'messageToast',
  initialState,
  reducers: {
    notifyMessageToast(state, action) {
      state.open = true
      state.message = action.payload.message
    },

    closeMessageToast(state) {
      state.open = false
      state.message = ''
    }
  }
})

export const { notifyMessageToast, closeMessageToast } = slice.actions

export default slice.reducer
