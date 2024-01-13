import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appSlice from './slice/app'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-'
}

const rootReducer = combineReducers({
  app: appSlice.reducer
})

export { rootPersistConfig, rootReducer }
