import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'

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
    openMessageToast(state, action) {
      state.open = true
      state.message = action.payload.message
    },

    closeMessageToast(state) {
      state.open = false
    }
  }
})

export const { closeMessageToast } = slice.actions

export default slice.reducer

export function notifyMessage(message: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { messageToast } = getState()

    const open = messageToast.open

    if (open) {
      dispatch(slice.actions.closeMessageToast())
    }

    dispatch(
      slice.actions.openMessageToast({
        message: message
      })
    )
  }
}
