import { Storage } from '@/shared/utils'
import { Socket, io } from 'socket.io-client'

export class SocketApi {
  static socket: Socket | null = null
  static createConnection() {
    const queryParams = {
      query: {
        accessToken: Storage.getToken(),
      },
    }

    this.socket = io('https://inctagram.work', queryParams)
    this.socket.on('connect', () => {
      console.log('Connected')
    })
    this.socket.on('disconnect', () => {
      console.log('Disconnected')
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
