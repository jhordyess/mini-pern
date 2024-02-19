import { Router } from 'express'
import { withValidation } from '../../middlewares/requestValidator.js'
import {
  createProduct,
  deleteProducts,
  getProduct,
  listAllProducts,
  updateProduct
} from '../../controllers/product.controller.js'
import {
  createProductCheck,
  deleteProductsCheck,
  getProductCheck,
  listAllCheck,
  updateProductCheck
} from './validations.js'

const router = Router()

router.get('/', ...withValidation(listAllCheck, listAllProducts))

router.get('/:id', ...withValidation(getProductCheck, getProduct))

router.post('/', ...withValidation(createProductCheck, createProduct))

router.put('/:id', ...withValidation(updateProductCheck, updateProduct))

router.delete('/:id', ...withValidation(deleteProductsCheck, deleteProducts))

export default router
