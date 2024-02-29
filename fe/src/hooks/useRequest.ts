import { useAppSelector } from './redux'

type TRequest<TResponseData> = {
  isLoading: boolean
  request: {
    [key in keyof TResponseData]?: TResponseData[key] | null
  }
}

export default function <TResponseData>() {
  const { request, isLoading } = useAppSelector(
    (state) => state.request
  ) as TRequest<TResponseData>

  return {
    request,
    isLoading
  }
}
