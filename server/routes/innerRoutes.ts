import { type RequestHandler, Router } from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import setUpMultipartFormDataParsing from '../middleware/setUpMultipartFormDataParsing'
import { renderInnerIndex, handleSelectedTasks } from '../controllers/indexController'

export default function routes(): Router {
  const router = Router()
  const get = (routePath: string | string[], handler: RequestHandler) => router.get(routePath, asyncMiddleware(handler))
  const post = (routePath: string | string[], handler: RequestHandler, middleware?: RequestHandler) => {
    if (middleware) {
      router.post(routePath, middleware, asyncMiddleware(handler))
    } else {
      router.post(routePath, asyncMiddleware(handler))
    }
  }
  router.use((req, res, next) => {
    const { bypass } = req.query
    if (bypass) {
      req.session.mock_logged_in = true
    }
    if (req.session.mock_logged_in) {
      next()
    } else {
      res.redirect('/one-login/')
    }
  })

  get('/', renderInnerIndex())
  post('/', handleSelectedTasks())

  return router
}
