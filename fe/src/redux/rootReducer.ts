import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appReducer from './slice/app'
import authReducer from './slice/auth'
import requestReducer from './slice/request'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: ['request']
}

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  request: requestReducer
})

export { rootPersistConfig, rootReducer }
