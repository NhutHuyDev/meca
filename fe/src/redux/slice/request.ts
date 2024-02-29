import { createSlice } from '@reduxjs/toolkit'

export type TRequestState = {
  isLoading: boolean
  request?: object | null
}

const initialState: TRequestState = {
  isLoading: false
}

const slice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    startRequest(state) {
      state.isLoading = true
    },
    setRequestHistory(state, action) {
      state.isLoading = false
      state.request = action.payload.request
    },
    clearRequestHistory(state) {
      state.isLoading = false
      state.request = null
    }
  }
})

export const { startRequest, setRequestHistory, clearRequestHistory } =
  slice.actions

export default slice.reducer

export type TRequest<TResponseData> = {
  success?: boolean | null
  responseData?: TResponseData | null

  error?: boolean | null
  errorMessage?: string | null
}

export function returnSuccessResponse<T>(requestType: T, responseData: object) {
  const request = requestType as string

  return {
    [request]: {
      success: true,
      responseData: responseData,
      error: false,
      errorMessage: null
    }
  }
}

export function returnErrorResponse<T>(requestType: T, errorMessage: string) {
  const request = requestType as string

  return {
    [request]: {
      success: false,
      successResponse: null,
      error: true,
      errorMessage: errorMessage
    }
  }
}
