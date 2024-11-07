export type GetNotificationsArgs = {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetNotificationsResponse = {
  items: Notification[]
  pageSize: number
  totalCount: number
}

export type Notification = {
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export type SocketResponse = {
  clientId: string
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}
