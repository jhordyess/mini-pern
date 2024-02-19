import { Router } from 'express'
import { createCategoryCheck } from './validations.js'
import { createCategory } from '../../controllers/category.controller.js'
import { withValidation } from '../../middlewares/requestValidator.js'

const router = Router()

router.post('/', ...withValidation(createCategoryCheck, createCategory))

export default router
