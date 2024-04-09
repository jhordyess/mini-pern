import { HttpError } from '../utils/error.js'
import {
  countProducts,
  getProduct as getProductService,
  getProductDetail,
  listAllProducts as listAllProductsService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProducts as deleteProductsService
} from '../services/productService/service.js'

export const listAllProducts = async (req, res, next) => {
  try {
    const { page = 0, rowsPerPage = 10, sortOrder = {} } = req.query

    const count = await countProducts()

    await listAllProductsService(page, rowsPerPage, sortOrder, (error, list) => {
      if (error) next(error)

      if (!list) throw new HttpError('Error while getting products', 500, false)

      res.status(200).json({
        data: {
          list,
          count
        }
      })
    })
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (req, res, next) => {
  const id = req.params.id
  const type = req.query.type

  try {
    if (type === 'basic') {
      await getProductService(id, (error, data) => {
        if (error) next(error)
        if (!data) throw new HttpError('Error while getting product', 500, false)
        res.status(200).json({
          data
        })
      })
    } else if (type === 'details') {
      await getProductDetail(id, (error, data) => {
        if (error) next(error)
        if (!data) throw new HttpError('Error while getting product', 500, false)
        res.status(200).json({
          data
        })
      })
    }
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const { productName, price, stock, details, category, brand } = req.body

    await createProductService(
      productName,
      price,
      stock,
      details,
      category,
      brand,
      (error, data) => {
        if (error) next(error)

        if (!data) throw new HttpError('Error while creating product', 500, false)

        res.status(201).json({
          message: 'Product created',
          data
        })
      }
    )
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id

    const { productName, price, stock, details, category, brand } = req.body

    await updateProductService(
      id,
      productName,
      price,
      stock,
      details,
      category,
      brand,
      (error, data) => {
        if (error) next(error)

        if (!data) throw new HttpError('Error while updating product', 500, false)

        res.status(200).json({
          message: 'Product updated',
          data
        })
      }
    )
  } catch (error) {
    next(error)
  }
}

export const deleteProducts = async (req, res, next) => {
  try {
    const { ids } = req.body

    await deleteProductsService(ids, (error, quantity) => {
      if (error) next(error)

      if (!quantity) throw new HttpError('Error while updating product', 500, false)

      res.status(200).json({
        message: `${quantity} product${quantity > 1 ? 's' : ''} deleted`
      })
    })
  } catch (error) {
    next(error)
  }
}
