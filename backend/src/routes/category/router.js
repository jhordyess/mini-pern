import { Router } from 'express'
import { createCategoryCheck } from './validations'
import { createCategory } from '../../controllers/category.controller'
import { withValidation } from '../../middlewares/requestValidator'

const router = Router()

router.post('/', ...withValidation(createCategoryCheck, createCategory))

export default router
