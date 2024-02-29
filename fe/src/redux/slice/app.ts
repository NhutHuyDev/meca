import { createSlice } from '@reduxjs/toolkit'

type TAppState = {
  sidebar: {
    open: boolean
    type: string
  }
}

const initialState: TAppState = {
  sidebar: {
    open: false,
    type: 'CONTACT'
  }
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebar.open = !state.sidebar.open
    },

    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type
    }
  }
})

export const { toggleSidebar, updateSidebarType } = slice.actions

export default slice.reducer
