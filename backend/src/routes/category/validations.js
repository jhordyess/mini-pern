import { body } from 'express-validator'

export const createCategoryCheck = body('name')
  .notEmpty()
  .withMessage('Name is required')
  .bail()
  .isString()
  .withMessage('Name must be a string')
  .escape()
