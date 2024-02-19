import { validationResult } from 'express-validator'
import { HttpError } from '../utils/error.js'

export const checkRequest = (req, _, next) => {
  try {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      const messages = result.array().map(error => error.msg)
      throw new HttpError(messages.join(', '), 400)
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const withValidation = (validation, handler) => [validation, checkRequest, handler]
