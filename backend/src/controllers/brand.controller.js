import { HttpError } from '../utils/error.js'

export const createBrand = async (req, res, next) => {
  try {
    const { name } = req.body

    await createBrand(name, (error, data) => {
      if (error) next(error)

      if (!data) throw new HttpError('Brand not created', 500, false)

      res.status(201).json({
        message: 'Brand created',
        data
      })
    })
  } catch (error) {
    next(error)
  }
}
