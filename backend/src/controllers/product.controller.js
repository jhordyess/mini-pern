import { HttpError } from '../utils/error.js'
import {
  countProducts,
  getProduct,
  getProductDetail,
  listAllProducts as listAllProductsService,
  createProduct as createProductService,
  updateProduct as updateProductService
} from '../services/productService/service.js'

export const listAllProducts = async (req, res, next) => {
  try {
    const { page, rowsPerPage, sortOrder } = req.query

    const query = {
      page: page || 0,
      rowsPerPage: rowsPerPage || 10,
      sortOrder: sortOrder || {}
    }

    const count = await countProducts()

    await listAllProductsService(query, (error, list) => {
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

export const getProductInfo = async (req, res, next) => {
  const id = req.params.id
  const type = req.query.type //basic|| details

  if (type === 'basic') {
    await getProduct(id, (error, data) => {
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
      (error, length) => {
        if (error) next(error)

        if (!length) throw new HttpError('Error while updating product', 500, false)

        res.status(200).json({
          message: `${length} product${length > 1 ? 's' : ''} deleted`
        })
      }
    )
  } catch (error) {
    next(error)
  }
}
