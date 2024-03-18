import { socket } from '@/socket'
import { GroupDataType, groupEvent } from './register'
import { AppDispatch } from '@/redux/store'
import { closeLoadingOverlay } from '@/redux/slice/loadingOverlay'
import { thunkFetchGroups } from '@/redux/slice/chatGroup'

export default function () {
  return (dispatch: AppDispatch) => {
    socket.on(
      groupEvent.create_success,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (data: GroupDataType[groupEvent.create_success]) => {
        dispatch(closeLoadingOverlay())
        dispatch(thunkFetchGroups())
      }
    )
  }
}
