import { body, param, query } from 'express-validator'

export const listAllCheck = [
  query('page')
    .optional()
    .notEmpty()
    .withMessage('page must not be empty')
    .isInt()
    .withMessage('page must be a number')
    .toInt(),
  query('rowsPerPage')
    .optional()
    .notEmpty()
    .withMessage('rowsPerPage must not be empty')
    .isInt()
    .withMessage('rowsPerPage must be a number')
    .toInt(),
  query('sortOrder').optional().notEmpty().withMessage('sortOrder must not be empty').isObject()
]

export const getProductCheck = [
  param('id')
    .notEmpty()
    .withMessage('id is required')
    .isInt()
    .withMessage('id must be a number')
    .toInt(),
  query('type')
    .optional()
    .isIn(['basic', 'details'])
    .withMessage('type must be basic or details')
    .escape()
]

export const createProductCheck = [
  body('productName')
    .notEmpty()
    .withMessage('productName is required')
    .bail()
    .isString()
    .withMessage('productName must be a string')
    .escape(),
  body('price')
    .notEmpty()
    .withMessage('price is required')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('price must be a valid number')
    .toFloat(),
  body('stock')
    .notEmpty()
    .withMessage('stock is required')
    .bail()
    .isInt({ min: 0 })
    .withMessage('stock must be a valid number')
    .toInt(),
  body('category')
    .notEmpty()
    .withMessage('category is required')
    .bail()
    .isString()
    .withMessage('category must be a string')
    .escape(),
  body('brand')
    .notEmpty()
    .withMessage('brand is required')
    .bail()
    .isString()
    .withMessage('brand must be a string')
    .escape(),
  body('details').optional().isString().withMessage('details must be a string').escape()
]

export const updateProductCheck = [
  param('id')
    .notEmpty()
    .withMessage('id is required')
    .isInt()
    .withMessage('id must be a number')
    .toInt(),
  body('productName')
    .notEmpty()
    .withMessage('productName is required')
    .bail()
    .isString()
    .withMessage('productName must be a string')
    .escape(),
  body('price')
    .notEmpty()
    .withMessage('price is required')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('price must be a valid number')
    .toFloat(),
  body('stock')
    .notEmpty()
    .withMessage('stock is required')
    .bail()
    .isInt({ min: 0 })
    .withMessage('stock must be a valid number')
    .toInt(),
  body('category')
    .notEmpty()
    .withMessage('category is required')
    .bail()
    .isString()
    .withMessage('category must be a string')
    .escape(),
  body('brand')
    .notEmpty()
    .withMessage('brand is required')
    .bail()
    .isString()
    .withMessage('brand must be a string')
    .escape(),
  body('details').optional().isString().withMessage('details must be a string').escape()
]

export const deleteProductsCheck = [
  body('ids')
    .notEmpty()
    .withMessage('ids is required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('ids must be a valid array')
    .toArray()
]
