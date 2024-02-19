import { Router } from 'express'
import { withValidation } from '../../middlewares/requestValidator'
import { createBrandCheck } from './validations'
import { createBrand } from '../../controllers/brand.controller'

const router = Router()

router.post('/', ...withValidation(createBrandCheck, createBrand))

export default router
