import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store.ts'

import App from './App.tsx'
import './index.css'
import RealTimeWapper from './realtime/RealTimeWapper.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <RealTimeWapper>
          <App />
        </RealTimeWapper>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
)
