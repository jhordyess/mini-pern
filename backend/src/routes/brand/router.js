import { Router } from 'express'
import { withValidation } from '../../middlewares/requestValidator.js'
import { createBrandCheck } from './validations.js'
import { createBrand } from '../../controllers/brand.controller.js'

const router = Router()

router.post('/', ...withValidation(createBrandCheck, createBrand))

export default router
