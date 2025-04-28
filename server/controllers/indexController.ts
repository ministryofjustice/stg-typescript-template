import { RequestHandler } from 'express'
import { randomUUID } from 'crypto'
import getDataService from '../services/serviceInjection'
import logger from '../../logger'
import { Task } from '../services/DataService'

export const renderInnerIndex = (dataService = getDataService()): RequestHandler => {
  return async (req, res, next) => {
    try {
      if (!req.session.user_id) {
        req.session.user_id = randomUUID()
      }

      const tasks = await dataService.getTasks(req.session.user_id)
      const { scenario, checkin } = req.query
      if (checkin && checkin === 'true') {
        delete req.session.checkInVideoPath
      }
      res.render('pages/inner/index', { scenario, session: req.session, tasks })
    } catch (error) {
      next(error)
    }
  }
}

export const handleSelectedTasks = (dataService = getDataService()): RequestHandler => {
  return async (req, res, next) => {
    try {
      const scenario = 'chosen'
      const tasks = await dataService.getTasks(req.session.user_id)
      const input = req.body.tasks
      logger.info(input)
      const chosenTasks: Array<Task> = []
      input.forEach((chosen: string) => {
        chosenTasks.push(tasks.find(({ code }) => code === chosen))
      })
      res.render('pages/inner/index', { scenario, chosenTasks })
    } catch (error) {
      next(error)
    }
  }
}
