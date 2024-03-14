import { TRequest } from '@/redux/slice/request'
import { useAppSelector } from './redux'

type TLastRequest<TResponseData> = {
  request: TRequest<TResponseData>
}

export default function <TResponseData>() {
  const { request } = useAppSelector(
    (state) => state.lastRequest
  ) as TLastRequest<TResponseData>

  return request
}
