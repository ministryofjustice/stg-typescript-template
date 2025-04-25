import { type RequestHandler, Router } from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware'
import {
  handleAccountCreated,
  handleCreatePassword,
  handleEnterPassword,
  handleLoginEmailAddress,
  handleLoginOtp,
  handlePhoneNumber,
  handleRegisterEmailAddress,
  handleRegisterOtp,
  handleRegisterOtpChoice,
  handleRegisterVerify,
  handleSignInCreate,
  renderAccountCreated,
  renderCreatePassword,
  renderEnterPassword,
  renderLoginEmailAddress,
  renderLoginOtp,
  renderOneLoginRoot,
  renderPhoneNumber,
  renderRegisterEmailAddress,
  renderRegisterOtp,
  renderRegisterOtpChoice,
  renderRegisterVerify,
} from '../controllers/oneloginController'

// todo move the guts of these routes to a oneLoginController

export default function authRoutes(): Router {
  const router = Router()
  const get = (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler))
  const post = (path: string | string[], handler: RequestHandler) => router.post(path, asyncMiddleware(handler))

  get('/', renderOneLoginRoot)
  post('/sign-in-or-create', handleSignInCreate)
  get('/enter-email-address', renderRegisterEmailAddress)
  post('/enter-email-address', handleRegisterEmailAddress)
  get('/verify-security-code', renderRegisterVerify)
  post('/verify-security-code', handleRegisterVerify)
  get('/create-password', renderCreatePassword)
  post('/create-password', handleCreatePassword)
  get('/enter-phone-number', renderPhoneNumber)
  post('/enter-phone-number', handlePhoneNumber)
  get('/get-security-code', renderRegisterOtpChoice)
  post('/get-security-code', handleRegisterOtpChoice)
  get('/check-phone', renderRegisterOtp)
  post('/check-phone', handleRegisterOtp)
  get('/account-created', renderAccountCreated)
  post('/account-created', handleAccountCreated)
  get('/enter-email-address-login', renderLoginEmailAddress)
  post('/enter-email-address-login', handleLoginEmailAddress)
  get('/enter-password', renderEnterPassword)
  post('/enter-password', handleEnterPassword)
  get('/check-phone-login', renderLoginOtp)
  post('/check-phone-login', handleLoginOtp)
  return router
}
