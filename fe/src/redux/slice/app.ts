import { createSlice } from '@reduxjs/toolkit'

type appState = {
  sidebar: {
    open: boolean
    type: string
  }
}

const initialState: appState = {
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

export default slice
