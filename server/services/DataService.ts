import { Session, SessionData } from 'express-session'

export type Task = {
  code: string
  description: string
}

export interface DataService {
  getTasks(userId: string): Promise<Array<Task>>

  deleteEvidence(session: Session & Partial<SessionData>, filename: string): Promise<void>
  submitEvidence(session: Session & Partial<SessionData>): Promise<void>
  uploadEvidence(session: Session & Partial<SessionData>, files: Express.Multer.File[]): Promise<void>
}
