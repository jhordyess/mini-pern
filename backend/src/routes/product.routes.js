import { BaseRouter } from './base.routes.js'
import ProductCtl from './../controllers/product.controller.js'

export default BaseRouter([
  { method: 'GET', path: '/', func: new ProductCtl().listAllProducts },
  { method: 'POST', path: '/', func: new ProductCtl().createProduct },
  { method: 'PUT', path: '/:id', func: new ProductCtl().updateProduct },
  { method: 'DELETE', path: '/', func: new ProductCtl().deleteProduct },
  { method: 'GET', path: '/:id', func: new ProductCtl().getProductInfo }
])
