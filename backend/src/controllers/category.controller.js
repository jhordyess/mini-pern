import response from './../utils/routes.response.js'
import BaseController from './base.controller.js'

export default class CategoryCtl extends BaseController {
  createCategory = async req => {
    const { name } = req.body
    if (!name || typeof name !== 'string')
      throw response.throw({ message: 'The property "name" is invalid' })
    const category = await this.prisma.category.upsert({
      where: {
        name: name
      },
      update: {},
      create: {
        name: name
      }
    })
    await this.disconnect()
    return response.normal({
      statusCode: 201,
      data: { category, message: 'Category created' }
    })
  }
}
