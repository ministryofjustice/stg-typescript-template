import express from 'express'
import cookieParser from 'cookie-parser'
import nunjucksSetup from './utils/nunjucksSetup'
import errorHandler from './errorHandler'
import setUpCsrf from './middleware/setUpCsrf'
import setUpStaticResources from './middleware/setUpStaticResources'
import setUpWebRequestParsing from './middleware/setupRequestParsing'
import setUpWebSecurity from './middleware/setUpWebSecurity'
import setUpWebSession from './middleware/setUpWebSession'
import { basicAuthentication } from './middleware/basicAuthentication'
import adminRoutes from './routes/adminRoutes'
import indexRoutes from './routes/index'
import authRoutes from './routes/authRoutes'
import innerRoutes from './routes/innerRoutes'

export default function createApp(): express.Application {
  const app = express()

  app.set('json spaces', 2)
  app.set('trust proxy', true)
  app.set('port', process.env.PORT || 3000)

  app.use(express.urlencoded({ extended: false }))

  app.use(setUpWebSecurity())
  app.use(setUpWebSession())
  app.use(setUpWebRequestParsing())
  app.use(setUpStaticResources())
  nunjucksSetup(app)
  app.use(setUpCsrf())

  // temporarily disable password protection as cookies cannot be set on edge for non-localhost domains
  app.use(cookieParser())
  app.use(basicAuthentication())
  app.use('/', indexRoutes())
  app.use('/admin', adminRoutes())
  app.use('/one-login', authRoutes())
  app.use('/inner', innerRoutes())

  app.use((req, res, next) => {
    res.status(404).render('pages/404.njk')
  })
  app.use(errorHandler(process.env.NODE_ENV === 'production'))

  return app
}
