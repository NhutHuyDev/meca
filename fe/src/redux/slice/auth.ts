import { TSignInSchema } from '@/lib/formSchema/signIn'
import { createSlice } from '@reduxjs/toolkit'
import axios from '@/utils/axios'
import { AppDispatch, RootState } from '../store'
// import customHttpHeaders from '@/utils/customHttpHeaders'

type TAuthState = {
  isLoggedIn: boolean
  clientId: string
  accessToken: string
  refreshToken: string
  isLoading?: boolean
}

const initialState: TAuthState = {
  isLoggedIn: false,
  clientId: '',
  accessToken: '',
  refreshToken: '',
  isLoading: false
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn
      state.clientId = action.payload.clientId
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    signOut(state) {
      state.isLoggedIn = false
      state.clientId = ''
      state.accessToken = ''
      state.refreshToken = ''
    }
  }
})

export default slice

/**
 * ---- ASYNC ACTIONS ----
 */

/**
 * @description sign-in
 */
export function thunkSignIn(formValue: TSignInSchema) {
  return async (dispatch: AppDispatch) => {
    await axios
      .post('/auth/sign-in', { ...formValue })
      .then((response) => {
        dispatch(
          slice.actions.signIn({
            isLoggedIn: true,
            clientId: response.data.clientId,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
          })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

/**
 * @description sign-out
 */
export function thunkSignOut() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()

    await axios
      .post(
        '/auth/sign-out',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + auth.accessToken,
            'x-client-id': auth.clientId,
            'x-refresh': auth.refreshToken
          }
        }
      )
      .then(() => {
        dispatch(slice.actions.signOut())
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
