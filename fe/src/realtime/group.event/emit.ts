import { socket } from '@/socket'
import { GroupDataType, groupEvent } from './register'
import { AppDispatch } from '@/redux/store'
import { openLoadingOverlay } from '@/redux/slice/loadingOverlay'

export default class GroupEventEmit {
  static create_group = function (
    data: GroupDataType[groupEvent.create_group]
  ) {
    return (dispatch: AppDispatch) => {
      dispatch(openLoadingOverlay())
      socket.emit(groupEvent.create_group, data)
    }
  }
}
