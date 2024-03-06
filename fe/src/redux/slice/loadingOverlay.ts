import { createSlice } from '@reduxjs/toolkit'

type TLoadingOverlayState = {
  open: boolean
}

const initialState: TLoadingOverlayState = {
  open: false
}

const slice = createSlice({
  name: 'loadingOverlay',
  initialState,
  reducers: {
    openLoadingOverlay(state) {
      state.open = true
    },

    closeLoadingOverlay(state) {
      state.open = false
    }
  }
})

export const { openLoadingOverlay, closeLoadingOverlay } = slice.actions

export default slice.reducer
