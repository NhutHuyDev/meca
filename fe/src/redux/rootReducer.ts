import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appSlice from './slice/app'
import authSlice from './slice/auth'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-'
}

const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer
})

export { rootPersistConfig, rootReducer }
