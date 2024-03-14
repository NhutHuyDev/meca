import { thunkFetchOthers } from '@/redux/slice/individualContact'
import { closeLoadingOverlay } from '@/redux/slice/loadingOverlay'
import { notifyMessage } from '@/redux/slice/messageToast'
import { AppDispatch } from '@/redux/store'
import { socket } from '@/socket'

export default function () {
  return (dispatch: AppDispatch) => {
    socket.on('error:service', async (data: { message: string }) => {
      dispatch(closeLoadingOverlay())
      dispatch(notifyMessage(data.message))
      dispatch(thunkFetchOthers())
    })
  }
}
