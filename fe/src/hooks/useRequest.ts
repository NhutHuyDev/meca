import { useAppSelector } from './redux'

type TLastRequest<TRequest> = {
  request: TRequest
}

export default function <TRequest>() {
  const { request } = useAppSelector(
    (state) => state.lastRequest
  ) as TLastRequest<TRequest>

  return request
}
