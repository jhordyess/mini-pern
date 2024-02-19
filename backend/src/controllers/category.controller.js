import { HttpError } from '../utils/error.js'
import { createCategory as createCategoryService } from '../services/categoryService.js'

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body

    await createCategoryService(name, (error, data) => {
      if (error) next(error)

      if (!data) throw new HttpError('Category not created', 500, false)

      res.status(201).json({
        message: 'Category created',
        data
      })
    })
  } catch (error) {
    next(error)
  }
}
