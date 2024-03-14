import { TSignInSchema } from '@/lib/formSchema/signIn'
import { TResetPasswordSchema } from '@/lib/formSchema/resetPassword'
import { TNewPasswordSchema } from '@/lib/formSchema/newPassword'
import { TRequestVerifyOtpSchema } from '@/lib/formSchema/requestVerifyOtp'
import { TVerifyEmailSchema } from '@/lib/formSchema/verifyEmail'
import { createSlice } from '@reduxjs/toolkit'
import axios from '@/utils/axios'
import { AppDispatch, RootState } from '../store'
import customHttpHeaders from '@/utils/customHttpHeaders'
import {
  sendRequest,
  getRespone,
  getError,
  clearRequest,
  TRequest
} from './request'
import { TSignUpSchema } from '@/lib/formSchema/signUp'
import { socket } from '@/socket'

export type TAuthState = {
  isLoggedIn: boolean
  clientId: string
  accessToken: string
  refreshToken: string
}

const initialState: TAuthState = {
  isLoggedIn: false,
  clientId: '',
  accessToken: '',
  refreshToken: ''
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

export default slice.reducer

/**
 * ---- THUNK ACTIONS ----
 */

enum authReq {
  signIn = 'signIn',
  signOut = 'signOut',
  forgotPassword = 'forgotPassword',
  resetPassword = 'resetPassword',
  requestVerifyOtp = 'requestVerifyOtp',
  verifyEmail = 'verifyEmail',
  signUp = 'signUp'
}

/**
 * @description sign-in
 */
export type TSignInResquest = {
  [authReq.signIn]: TRequest<{
    clientId: string
    accessToken: string
    refreshToken: string
  }>
}
export function thunkSignIn(formValue: TSignInSchema) {
  return async (dispatch: AppDispatch) => {
    const requestName = authReq.signIn
    const apiUrl = '/auth/sign-in'

    dispatch(
      sendRequest({
        requestName
      })
    )

    await axios
      .post(apiUrl, { ...formValue })
      .then((response) => {
        dispatch(
          getRespone({
            requestName,
            responseData: response.data
          })
        )

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
        dispatch(
          getError({
            requestName,
            errorMessage: error.message
          })
        )
      })
  }
}

/**
 * @description sign-out
 */
export function thunkSignOut() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(clearRequest())

    const { auth } = getState()

    await axios
      .post(
        '/auth/sign-out',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + auth.accessToken,
            [customHttpHeaders.CLIENT_ID]: auth.clientId,
            [customHttpHeaders.REFRESH_TOKEN]: auth.refreshToken
          }
        }
      )
      .then(() => {
        socket && socket.emit('end', { userId: auth.clientId })
        dispatch(slice.actions.signOut())
      })
      .catch(() => {
        socket && socket.emit('end', { userId: auth.clientId })
        dispatch(slice.actions.signOut())
      })
  }
}

/**
 * @description forgot-password
 */
export type TForgotPasswordResquest = {
  [authReq.forgotPassword]: TRequest<{
    email: string
    message: string
  }>
}
export function thunkForgotPassword(formValue: TResetPasswordSchema) {
  return async (dispatch: AppDispatch) => {
    const requestName = authReq.forgotPassword
    const apiUrl = '/auth/forgot-password'

    dispatch(
      sendRequest({
        requestName
      })
    )

    await axios
      .post(apiUrl, { ...formValue })
      .then((response) => {
        dispatch(
          getRespone({
            requestName,
            responseData: response.data
          })
        )
      })
      .catch((error) => {
        dispatch(
          getError({
            requestName,
            errorMessage: error.message
          })
        )
      })
  }
}

/**
 * @description reset-password
 */

export type TResetPasswordResquest = {
  [authReq.resetPassword]: TRequest<{
    email: string
    message: string
  }>
}
export function thunkResetPassword(formValue: TNewPasswordSchema) {
  const userId = formValue.params?.userId
  const passwordResetCode = formValue.params?.passwordResetCode

  const requestName = authReq.resetPassword
  const apiUrl = '/auth/reset-password'

  return async (dispatch: AppDispatch) => {
    dispatch(
      sendRequest({
        requestName: requestName
      })
    )

    await axios
      .post(`${apiUrl}/${userId}/${passwordResetCode}`, {
        ...formValue.body
      })
      .then((response) => {
        dispatch(
          getRespone({
            requestName: requestName,
            responseData: response.data
          })
        )
      })
      .catch((error) => {
        dispatch(
          getError({
            requestName: requestName,
            errorMessage: error.message
          })
        )
      })
  }
}

/**
 * @description request-verify-otp
 */

export type TRequestVerifyOtpResquest = {
  [authReq.requestVerifyOtp]: TRequest<{
    email: string
    message: string
  }>
}
export function thunkRequestVerifyOtp(formValue: TRequestVerifyOtpSchema) {
  const requestName = authReq.requestVerifyOtp

  const apiUrl = '/users/request-verify-otp'

  return async (dispatch: AppDispatch) => {
    dispatch(
      sendRequest({
        requestName
      })
    )

    await axios
      .post(apiUrl, {
        ...formValue
      })
      .then((response) => {
        dispatch(
          getRespone({
            requestName,
            responseData: response.data
          })
        )
      })
      .catch((error) => {
        dispatch(
          dispatch(
            getError({
              requestName,
              errorMessage: error.message
            })
          )
        )
      })
  }
}

/**
 * @description verify-email
 */

export type TVerifyEmailResquest = {
  [authReq.verifyEmail]: TRequest<{
    email: string
    message: string
  }>
}
export function thunkVerifyEmail(formValue: TVerifyEmailSchema) {
  const requestName = authReq.requestVerifyOtp
  const apiUrl = '/users/verify'

  return async (dispatch: AppDispatch) => {
    dispatch(
      sendRequest({
        requestName
      })
    )

    await axios
      .post(apiUrl, {
        ...formValue
      })
      .then((response) => {
        dispatch(
          dispatch(
            getRespone({
              requestName,
              responseData: response.data
            })
          )
        )
      })
      .catch((error) => {
        dispatch(
          getError({
            requestName,
            errorMessage: error.message
          })
        )
      })
  }
}

/**
 * @description sign-up
 */

export type TSignUpRequest = {
  [authReq.signUp]: TRequest<{
    email: string
    message: string
  }>
}
export function thunkSignUp(formValue: TSignUpSchema) {
  const requestName = authReq.signUp
  const apiUrl = '/users/'

  return async (dispatch: AppDispatch) => {
    dispatch(
      sendRequest({
        requestName
      })
    )

    await axios
      .post(apiUrl, {
        ...formValue
      })
      .then((response) => {
        dispatch(
          dispatch(
            getRespone({
              requestName,
              responseData: response.data
            })
          )
        )
      })
      .catch((error) => {
        dispatch(
          getError({
            requestName,
            errorMessage: error.message
          })
        )
      })
  }
}
