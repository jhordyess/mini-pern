import { body } from 'express-validator'

export const createBrandCheck = body('name')
  .notEmpty()
  .withMessage('Name is required')
  .bail()
  .isString()
  .withMessage('Name must be a string')
  .escape()
