import fs from 'fs'
import { Session, SessionData } from 'express-session'
import { DataService } from './DataService'
import tasks from '../routes/data/tasks'
import logger from '../../logger'

const PrototypeDataService: DataService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTasks(userId: string) {
    return tasks
  },

  async deleteEvidence(session: Session & Partial<SessionData>, filename: string): Promise<void> {
    try {
      const evidenceIndex = session.uploadedEvidence.findIndex(
        (file: { filename: string }) => file.filename === filename,
      )
      if (evidenceIndex === -1) {
        logger.error(`Evidence not found.`)
      }

      const evidencePath = session.uploadedEvidence[evidenceIndex].path
      session.uploadedEvidence.splice(evidenceIndex, 1)
      fs.unlink(evidencePath, err => {
        if (err) {
          logger.error(`Error deleting: ${err.message}`)
        } else {
          logger.info(`File deleted: ${evidencePath}`)
        }
      })
    } catch (error) {
      logger.error(`Error deleting evidence: ${error.message}`)
    }
  },

  async submitEvidence(session: Session & Partial<SessionData>): Promise<void> {
    // eslint-disable-next-line no-param-reassign
    session.uploadedEvidence = []
  },

  async uploadEvidence(session: Session & Partial<SessionData>, files: Express.Multer.File[]): Promise<void> {
    const uploadedEvidence = session.uploadedEvidence || []
    files.forEach(file => {
      uploadedEvidence.push({
        filename: file.originalname,
        path: file.path,
      })
    })
    // eslint-disable-next-line no-param-reassign
    session.uploadedEvidence = uploadedEvidence
  },
}

export default PrototypeDataService
