import { RequestHandler } from 'express'

export const renderOneLoginRoot: RequestHandler = async (req, res, next) => {
  if (req.session.mock_logged_in) {
    return res.redirect('/inner')
  }
  return res.render('pages/one-login/sign-in-or-create')
}

export const handleSignInCreate: RequestHandler = async (req, res, next) => {
  const { optionSelected } = req.body
  if (optionSelected === 'create') {
    return res.redirect('/one-login/enter-email-address')
  }
  return res.redirect('/one-login/enter-email-address-login')
}

export const renderRegisterEmailAddress: RequestHandler = async (req, res, next) => {
  const { errorMessage } = req.session
  delete req.session.errorMessage
  res.render('pages/one-login/enter-email-address', { errorMessage })
}

export const handleRegisterEmailAddress: RequestHandler = async (req, res, next) => {
  const { email } = req.body
  if (!email.endsWith('@example.com')) {
    req.session.errorMessage = 'You must enter a valid email address with example.com domain'
    return res.redirect('/one-login/enter-email-address')
  }
  return res.redirect(`/one-login/verify-security-code?email=${encodeURIComponent(email)}`)
}

export const renderRegisterVerify: RequestHandler = async (req, res, next) => {
  const { email } = req.query
  if (!email) {
    return res.redirect('/one-login/enter-email-address')
  }
  const { errorMessage } = req.session
  delete req.session.errorMessage
  return res.render('pages/one-login/verify-security-code', { email, errorMessage })
}

export const handleRegisterVerify: RequestHandler = async (req, res, next) => {
  const { code } = req.body
  const email = req.query.email || req.body.email
  if (code !== process.env.VALID_OTP) {
    req.session.errorMessage = 'Invalid OTP code. Please try again.'
    const { errorMessage } = req.session
    delete req.session.errorMessage
    return res.render('pages/one-login/verify-security-code', { email, errorMessage })
  }
  return res.redirect('/one-login/create-password')
}

export const renderCreatePassword: RequestHandler = async (req, res, next) => {
  const { errorMessage } = req.session
  delete req.session.errorMessage
  res.render('pages/one-login/create-password', { errorMessage })
}

export const handleCreatePassword: RequestHandler = async (req, res, next) => {
  const { password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    req.session.errorMessage = 'Passwords do not match. Please try again.'
    return res.redirect('/one-login/create-password')
  }
  if (password.length < 8) {
    req.session.errorMessage = 'Password must be at least 8 characters long. Please try again.'
    return res.redirect('/one-login/create-password')
  }
  return res.redirect('/one-login/enter-phone-number')
}

export const renderPhoneNumber: RequestHandler = async (req, res, next) => {
  const { errorMessage } = req.session
  delete req.session.errorMessage
  res.render('pages/one-login/enter-phone-number', { errorMessage })
}

export const handlePhoneNumber: RequestHandler = async (req, res, next) => {
  const { phoneNumber, hasInternationalPhoneNumber, internationalPhoneNumber } = req.body
  let errorMessage = null

  if (hasInternationalPhoneNumber && !internationalPhoneNumber) {
    errorMessage = 'You must enter an international phone number.'
  } else if (!hasInternationalPhoneNumber && !phoneNumber) {
    errorMessage = 'You must enter a UK mobile phone number.'
  }

  if (errorMessage) {
    req.session.errorMessage = errorMessage
    return res.redirect('/one-login/enter-phone-number')
  }

  return res.redirect('/one-login/get-security-code')
}

export const renderRegisterOtpChoice: RequestHandler = async (req, res, next) => {
  const { errorMessage } = req.session
  delete req.session.errorMessage
  res.render('pages/one-login/get-security-code', { errorMessage })
}

export const handleRegisterOtpChoice: RequestHandler = async (req, res, next) => {
  const { 'choose-security-codes': chooseSecurityCodes } = req.body
  let errorMessage = null

  if (!chooseSecurityCodes) {
    errorMessage = 'You must choose a method to get code.'
  }

  if (errorMessage) {
    req.session.errorMessage = errorMessage
    return res.redirect('/one-login/get-security-code')
  }

  return res.redirect('/one-login/check-phone')
}

export const renderRegisterOtp: RequestHandler = async (req, res, next) => {
  const { errorMessage } = req.session
  delete req.session.errorMessage
  res.render('pages/one-login/check-phone', { errorMessage })
}

export const handleRegisterOtp: RequestHandler = async (req, res, next) => {
  const { otp } = req.body
  let errorMessage = null

  if (otp !== process.env.POP_LOGIN_OTP) {
    errorMessage = 'Invalid OTP code. Please try again.'
  }

  if (errorMessage) {
    req.session.errorMessage = errorMessage
    return res.redirect('/one-login/check-phone')
  }

  return res.redirect('/one-login/account-created')
}

export const renderAccountCreated: RequestHandler = async (req, res, next) => {
  res.render('pages/one-login/account-created')
}

export const handleAccountCreated: RequestHandler = async (req, res, next) => {
  req.session.mock_logged_in = true
  return res.redirect('/inner/verify')
}

export const renderLoginEmailAddress: RequestHandler = async (req, res, next) => {
  const { errorMessage } = req.session
  delete req.session.errorMessage
  res.render('pages/one-login/enter-email-address-login', { errorMessage })
}

export const handleLoginEmailAddress: RequestHandler = async (req, res, next) => {
  const { email } = req.body
  if (!email.endsWith('@example.com')) {
    req.session.errorMessage = 'You must enter a valid email address with example.com domain'
    return res.redirect('/one-login/enter-email-address-login')
  }
  return res.redirect('/one-login/enter-password')
}

export const renderEnterPassword: RequestHandler = async (req, res, next) => {
  const { errorMessage } = req.session
  delete req.session.errorMessage
  res.render('pages/one-login/enter-password', { errorMessage })
}

export const handleEnterPassword: RequestHandler = async (req, res, next) => {
  const { password } = req.body

  if (password !== process.env.POP_PASSWORD) {
    req.session.errorMessage = 'Invalid password. Please try again.'
    return res.redirect('/one-login/enter-password')
  }
  return res.redirect('/one-login/check-phone-login')
}

export const renderLoginOtp: RequestHandler = async (req, res, next) => {
  const { errorMessage } = req.session
  delete req.session.errorMessage
  res.render('pages/one-login/check-phone-login', { errorMessage })
}

export const handleLoginOtp: RequestHandler = async (req, res, next) => {
  const { otp } = req.body
  if (otp !== process.env.POP_LOGIN_OTP) {
    req.session.errorMessage = 'Invalid OTP code. Please try again.'
    return res.redirect('/one-login/check-phone-login')
  }
  req.session.mock_logged_in = true
  return res.redirect('/inner')
}
