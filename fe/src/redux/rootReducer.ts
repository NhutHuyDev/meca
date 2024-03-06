import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import appReducer from './slice/app'
import authReducer from './slice/auth'
import requestReducer from './slice/request'
import chatOneToOneReducer from './slice/chatOneToOne'
import individualContactReducer from './slice/individualContact'
import loadingOverlayReducer from './slice/loadingOverlay'
import messageToastReducer from './slice/messageToast'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: [
    'request',
    'chatOneToOne',
    'individualContact',
    'loadingOverlay',
    'messageToast'
  ]
}

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  request: requestReducer,
  chatOneToOne: chatOneToOneReducer,
  individualContact: individualContactReducer,
  loadingOverlay: loadingOverlayReducer,
  messageToast: messageToastReducer
})

export { rootPersistConfig, rootReducer }
