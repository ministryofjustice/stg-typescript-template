export declare module 'express-session' {
  // Declare that the session will potentially contain these additional fields
  interface SessionData {
    returnTo: string
    nowInMinutes: number
    user_id: string
    idOption: string
    successMessage: string
    errorMessage: string
    mock_logged_in: boolean
    verificationPhoto: string
    uploadedEvidence: Array<{ path: string; filename: string }>
    checkInVideoPath: string
  }
}

export declare global {
  namespace Express {
    interface User {
      username: string
      token: string
      authSource: string
    }

    interface Request {
      verified?: boolean
      id: string
      logout(done: (err: unknown) => void): void
    }
  }
}
