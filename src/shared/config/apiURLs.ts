export const API_URLS = {
  AUTH: {
    CHECK_RECOVERY_CODE: 'v1/auth/check-recovery-code',
    LOGIN: 'v1/auth/login',
    LOGOUT: 'v1/auth/logout',
    ME: 'v1/auth/me',
    NEW_PASSWORD: 'v1/auth/new-password',
    PASSWORD_RECOVERY: 'v1/auth/password-recovery',
    REGISTRATION: 'v1/auth/registration',
    REGISTRATION_CONFIRMATION: 'v1/auth/registration-confirmation',
    REGISTRATION_EMAIL_RESENDING: 'v1/auth/registration-email-resending',
    UPDATE_TOKENS: 'v1/auth/update-tokens',
  },
  BASE_URL: 'https://inctagram.work/api/',
  DEVICES: {
    DELETE_SESSION_BY_DEVICE_ID: (deviceId: number) => `v1/sessions/${deviceId}`,
    DELETE_SESSION_TEMPLATE_ALL: 'v1/sessions/terminate-all',
    GET_SESSIONS: 'v1/sessions',
  },
  NOTIFICATIONS: {
    DELETE_NOTIFICATIONS: (id: number) => `v1/notifications/${id}`,
    GET_ALL_NOTIFICATIONS: (cursor: number | undefined) => `v1/notifications/${cursor}`,
    MARK_NOTIFICATION_AS_READ: 'v1/notifications/mark-as-read',
  },
  POSTS: {
    CREATE_POST: 'v1/posts',
    DELETE_POST: (postId: number) => `v1/posts/${postId}`,
    DELETE_UPLOAD_IMAGE: (uploadId: string | string[]) => `v1/posts/image/${uploadId}`,
    GET_POST_BY_ID: (postId: number | undefined) => `v1/public-posts/${postId}`,
    GET_USER_PUBLIC_POSTS: (endCursorPostId: number | undefined, userId: number) =>
      `v1/public-posts/user/${userId}/${endCursorPostId}`,
    UPDATE_POST: (postId: number) => `v1/posts/${postId}`,
    UPLOAD_POST_IMAGE: 'v1/posts/image',
  },
  PROFILE: {
    DELETE_AVATAR: 'v1/users/profile/avatar',
    DELETE_PROFILE: 'v1/users/profile',
    DELETE_PROFILE_BY_ID: (id: number) => `v1/users/profile/${id}`,
    GET_PROFILE: 'v1/users/profile',
    POST_AVATAR: 'v1/users/profile/avatar',
    UPDATE_PROFILE: 'v1/users/profile',
  },

  PUBLIC_USERS: {
    GET_TOTAL_COUNT_USERS: 'v1/public-user',
  },
  SOCKET_URL: 'https://inctagram.work',
  SUBSCRIPTIONS: {
    CANCEL_AUTO_RENEWAL: 'v1/subscriptions/canceled-auto-renewal',
    CREATE_SUBSCRIPTIONS: 'v1/subscriptions',
    GET_MY_PAYMENTS: 'v1/subscriptions/my-payments',
    GET_SUBSCRIPTIONS_COST_PAYMENT: 'v1/subscriptions/cost-of-payment-subscriptions',
    GET_SUBSCRIPTIONS_CURRENT_PAYMENT: 'v1/subscriptions/current-payment-subscriptions',
  },
}

export const METHOD = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
} as const

export const WS_EVENT_PATH = {
  ERROR: 'error',
  MESSAGE_DELETED: 'message-deleted',
  MESSAGE_SENT: 'message-sent',
  NOTIFICATIONS: 'notifications',
  RECEIVE_MESSAGE: 'receive-message',
  UPDATE_MESSAGE: 'update-message',
} as const
