import { BaseRouter } from './base.routes.js'
import CategoryCtl from './../controllers/category.controller.js'

export default BaseRouter([{ method: 'POST', path: '/', func: new CategoryCtl().createCategory }])
