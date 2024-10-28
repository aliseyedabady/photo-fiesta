import { baseApi } from '@/app/api'
import { GetNotificationsArgs, GetNotificationsResponse } from '@/features'
import { API_URLS, METHOD } from '@/shared/config'

const { DELETE, POST } = METHOD
const { DELETE_NOTIFICATIONS, GET_ALL_NOTIFICATIONS, MARK_NOTIFICATION_AS_READ } =
  API_URLS.NOTIFICATIONS

/**
 * API endpoints for handling notifications within the application.
 * Provides functionality to delete notifications, retrieve all notifications, and mark notifications as read.
 */

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /** Deletes a specified notification.
     * @param {number} args.id - The unique identifier of the notification to delete.
     */
    deleteNotification: builder.mutation<void, { id: number }>({
      invalidatesTags: ['Notifications'],
      query: ({ id }) => ({
        method: DELETE,
        url: DELETE_NOTIFICATIONS(id),
      }),
    }),
    /** Retrieves all notifications, optionally using a cursor for pagination.
     * @param {string} args.cursor - An optional cursor to specify the starting point for the query.
     */
    getAllNotifications: builder.query<GetNotificationsResponse, GetNotificationsArgs>({
      providesTags: ['Notifications'],
      query: ({ cursor }) => GET_ALL_NOTIFICATIONS(cursor),
    }),
    /** Marks a list of notifications as read.
     * @param {number[]} params.ids - Array of notification IDs to mark as read.
     */
    markNotificationAsRead: builder.mutation<void, { ids: number[] }>({
      invalidatesTags: ['Notifications'],
      query: params => ({
        body: params,
        method: POST,
        url: MARK_NOTIFICATION_AS_READ,
      }),
    }),
  }),
})

export const {
  useDeleteNotificationMutation,
  useGetAllNotificationsQuery,
  useMarkNotificationAsReadMutation,
} = notificationsApi
