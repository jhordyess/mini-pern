import response from './../utils/routes.response.js'
import BaseController from './base.controller.js'

export default class BrandCtl extends BaseController {
  createBrand = async req => {
    const { name } = req.body
    if (!name || typeof name !== 'string')
      throw response.throw({ message: 'The property "name" is invalid' })
    const brand = await this.prisma.brand.upsert({
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
      data: { brand, message: 'Brand created' }
    })
  }
}
