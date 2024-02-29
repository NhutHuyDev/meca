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
  startRequest,
  clearRequestHistory,
  returnErrorResponse,
  returnSuccessResponse,
  setRequestHistory,
  TRequest
} from './request'
import { TSignUpSchema } from '@/lib/formSchema/signUp'

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

type TAuthRequest =
  | 'signIn'
  | 'signOut'
  | 'forgotPassword'
  | 'resetPassword'
  | 'requestVerifyOtp'
  | 'verifyEmail'
  | 'signUp'

/**
 * @description sign-in
 */
export type TSignInResquest = {
  signIn: TRequest<{
    clientId: string
    accessToken: string
    refreshToken: string
  }>
}
export function thunkSignIn(formValue: TSignInSchema) {
  return async (dispatch: AppDispatch) => {
    const apiUrl = '/auth/sign-in'

    dispatch(startRequest())

    await axios
      .post(apiUrl, { ...formValue })
      .then((response) => {
        dispatch(
          setRequestHistory({
            request: returnSuccessResponse<TAuthRequest>(
              'signIn',
              response.data
            )
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
          setRequestHistory({
            request: returnErrorResponse<TAuthRequest>(
              'signIn',
              error.data.message
            )
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
    dispatch(clearRequestHistory())

    const { auth } = getState()

    dispatch(startRequest())

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
        dispatch(slice.actions.signOut())
      })
      .catch(() => {
        dispatch(slice.actions.signOut())
      })
  }
}

/**
 * @description forgot-password
 */
export type TForgotPasswordResquest = {
  forgotPassword: TRequest<{
    email: string
    message: string
  }>
}
export function thunkForgotPassword(formValue: TResetPasswordSchema) {
  return async (dispatch: AppDispatch) => {
    const apiUrl = '/auth/forgot-password'

    dispatch(startRequest())

    await axios
      .post(apiUrl, { ...formValue })
      .then((response) => {
        dispatch(
          setRequestHistory({
            request: returnSuccessResponse<TAuthRequest>(
              'forgotPassword',
              response.data
            )
          })
        )
      })
      .catch((error) => {
        dispatch(
          setRequestHistory({
            request: returnErrorResponse<TAuthRequest>(
              'forgotPassword',
              error.data.message
            )
          })
        )
      })
  }
}

/**
 * @description reset-password
 */

export type TResetPasswordResquest = {
  resetPassword: TRequest<{
    email: string
    message: string
  }>
}
export function thunkResetPassword(formValue: TNewPasswordSchema) {
  const userId = formValue.params?.userId
  const passwordResetCode = formValue.params?.passwordResetCode

  const apiUrl = '/auth/forgot-password'

  return async (dispatch: AppDispatch) => {
    dispatch(startRequest())

    await axios
      .post(`${apiUrl}/${userId}/${passwordResetCode}`, {
        ...formValue.body
      })
      .then((response) => {
        dispatch(
          setRequestHistory({
            request: returnSuccessResponse<TAuthRequest>(
              'resetPassword',
              response.data
            )
          })
        )
      })
      .catch((error) => {
        dispatch(
          setRequestHistory({
            request: returnErrorResponse<TAuthRequest>(
              'resetPassword',
              error.data.message
            )
          })
        )
      })
  }
}

/**
 * @description request-verify-otp
 */

export type TRequestVerifyOtpResquest = {
  resetPassword: TRequest<{
    email: string
    message: string
  }>
}
export function thunkRequestVerifyOtp(formValue: TRequestVerifyOtpSchema) {
  const apiUrl = '/users/request-verify-otp'

  return async (dispatch: AppDispatch) => {
    dispatch(startRequest())

    await axios
      .post(apiUrl, {
        ...formValue
      })
      .then((response) => {
        dispatch(
          setRequestHistory({
            request: returnSuccessResponse<TAuthRequest>(
              'requestVerifyOtp',
              response.data
            )
          })
        )
      })
      .catch((error) => {
        dispatch(
          setRequestHistory({
            request: returnErrorResponse<TAuthRequest>(
              'requestVerifyOtp',
              error.data.message
            )
          })
        )
      })
  }
}

/**
 * @description verify-email
 */

export type TVerifyEmailResquest = {
  resetPassword: TRequest<{
    email: string
    message: string
  }>
}
export function thunkVerifyEmail(formValue: TVerifyEmailSchema) {
  const apiUrl = '/users/verify'

  return async (dispatch: AppDispatch) => {
    dispatch(startRequest())

    await axios
      .post(apiUrl, {
        ...formValue
      })
      .then((response) => {
        dispatch(
          setRequestHistory({
            request: returnSuccessResponse<TAuthRequest>(
              'verifyEmail',
              response.data
            )
          })
        )
      })
      .catch((error) => {
        dispatch(
          setRequestHistory({
            request: returnErrorResponse<TAuthRequest>(
              'verifyEmail',
              error.data.message
            )
          })
        )
      })
  }
}

/**
 * @description sign-up
 */

export type TSignUpRequest = {
  resetPassword: TRequest<{
    email: string
    message: string
  }>
}
export function thunkSignUp(formValue: TSignUpSchema) {
  const apiUrl = '/users/'

  return async (dispatch: AppDispatch) => {
    dispatch(startRequest())

    await axios
      .post(apiUrl, {
        ...formValue
      })
      .then((response) => {
        dispatch(
          setRequestHistory({
            request: returnSuccessResponse<TAuthRequest>(
              'signUp',
              response.data
            )
          })
        )
      })
      .catch((error) => {
        dispatch(
          setRequestHistory({
            request: returnErrorResponse<TAuthRequest>(
              'signUp',
              error.data.message
            )
          })
        )
      })
  }
}
