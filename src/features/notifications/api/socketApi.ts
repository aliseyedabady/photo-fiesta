import { API_URLS } from '@/shared/config'
import { Storage } from '@/shared/utils'
import { Socket, io } from 'socket.io-client'

const { SOCKET_URL } = API_URLS

export class SocketApi {
  static socket: Socket | null = null
  static createConnection() {
    const accessToken = Storage.getToken()
    const queryParams = {
      query: {
        accessToken,
      },
    }

    this.socket = io(SOCKET_URL, queryParams)
    this.socket.on('connect', () => {
      console.log('Connected')
    })
    this.socket.on('disconnect', reason => {
      console.log('Disconnected', reason)
    })
    this.socket.on('connect_error', error => {
      console.log('Connection failed', error)
    })
  }
  static disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }
}
