import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TLastRequest = {
  request?: object
}

const initialState: TLastRequest = {}

const slice = createSlice({
  name: 'lastRequest',
  initialState,
  reducers: {
    sendRequest(state, action: PayloadAction<{ requestName: string }>) {
      const requestName = action.payload.requestName
      const isLoading = true

      const request = state.request as {
        [key: string]: object
      }

      if (!request) {
        state.request = {
          [requestName]: {
            requestName,
            isLoading
          }
        }

        return
      }

      const previousReq = Object.keys(request)
      if (previousReq.length === 1 || previousReq[0] === requestName) {
        const previousReq = state.request
          ? (request[requestName] as object)
          : {}
        state.request = {
          [requestName]: {
            ...previousReq,
            isLoading
          }
        }
      } else {
        state.request = {
          [requestName]: {
            requestName,
            isLoading
          }
        }
      }
    },

    getRespone(
      state,
      action: PayloadAction<{ requestName: string; responseData: object }>
    ) {
      const requestName = action.payload.requestName
      const responseData = action.payload.responseData
      state.request = returnSuccessResponse(requestName, responseData)
    },
    getError(
      state,
      action: PayloadAction<{ requestName: string; errorMessage: string }>
    ) {
      const requestName = action.payload.requestName
      const errorMessage = action.payload.errorMessage
      state.request = returnErrorResponse(requestName, errorMessage)
    },
    clearRequest(state) {
      state.request = undefined
    }
  }
})

export const { sendRequest, getError, getRespone, clearRequest } = slice.actions

export default slice.reducer

export type TRequest<TResponseData> = {
  isLoading: boolean

  success?: boolean
  responseData?: TResponseData

  error?: boolean
  errorMessage?: string
}

function returnSuccessResponse(requestName: string, responseData: object) {
  return {
    [requestName]: {
      isLoading: false,
      success: true,
      responseData: responseData,
      error: undefined,
      errorMessage: undefined
    }
  }
}

function returnErrorResponse(requestName: string, errorMessage: string) {
  return {
    [requestName]: {
      isLoading: false,
      success: undefined,
      successResponse: undefined,
      error: true,
      errorMessage: errorMessage
    }
  }
}
