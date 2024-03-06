import io, { Socket } from 'socket.io-client'

let socket: Socket

const connectSocket = (userId: string) => {
  socket = io('http://localhost:8080', {
    query: {
      userId: userId
    }
  })
}

export { socket, connectSocket }
