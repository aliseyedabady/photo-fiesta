export type SignUpData = {
  email: string
  password: string
  userName: string
}

export type SignInData = {
  email: string
  password: string
}

export type SuccessSignInResponse = {
  accessToken: string
}

export type ConfirmRegistration = {
  confirmationCode: string
}

export type ResendLink = {
  baseUrl?: string
  email: string
}

export type CreateNewPasswordData = {
  newPassword: string
  recoveryCode: string
}

export type ErrorResponse = {
  /** The data object containing error details */
  data: {
    /** A general error message or error type */
    error: string
    /** An array of specific error messages for different fiel ds */
    messages: { field: string; message: string }[]
    /** The HTTP status code of the error */
    statusCode: number
  }
}

export type AuthMeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
