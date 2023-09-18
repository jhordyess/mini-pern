import response from './../utils/routes.response.js'
import BaseController from './base.controller.js'
import { addZeros } from '../utils/number.js'

export default class ProductCtl extends BaseController {
  constructor() {
    super([
      { table: 'category', column: 'name' },
      { table: 'brand', column: 'name' }
    ])
  }

  listAllProducts = async req => {
    const { page = 0, rowsPerPage = 10, sortOrder = {} } = req.query
    let products = await this.prisma.product.findMany({
      skip: this.prismaSkip(page, rowsPerPage),
      take: this.prismaTake(rowsPerPage),
      orderBy: this.prismaOrderBy(sortOrder),
      where: {
        deleted: false
      },
      select: {
        id: true,
        sku: true,
        productName: true,
        price: true,
        stock: true,
        category: {
          select: { name: true }
        },
        brand: {
          select: { name: true }
        }
      }
    })
    await this.disconnect()
    return response.normal({
      data: {
        count: await this.#countProducts(true),
        list: this.formatRelation(products)
      }
    })
  }

  getProductInfo = async req => {
    const id = req.params.id
    const type = req.query.type
    if (typeof id === 'undefined') throw response.throw({ message: 'Invalid identifier' })
    let product = {}
    switch (type) {
      case 'basic':
        product = await this.prisma.product.findUnique({
          where: {
            id: parseInt(id)
          },
          select: {
            productName: true,
            price: true,
            stock: true,
            details: true,
            category: {
              select: {
                name: true
              }
            },
            brand: {
              select: {
                name: true
              }
            }
          }
        })
        product = this.formatObj(product)
        break
      case 'details':
        product = await this.prisma.product.findUnique({
          where: {
            id: parseInt(id)
          },
          select: {
            details: true,
            createdAt: true
          }
        })
        break
      default:
        throw response.throw({
          message: 'Type query invalid',
          publicError: false
        })
    }
    await this.disconnect()
    return response.normal({
      data: product
    })
  }

  createProduct = async req => {
    const { productName, price, stock, details = '', category, brand } = req.body
    if (!(productName && price && stock && category && brand))
      throw response.throw({ message: 'Invalid properties' })
    let product = await this.prisma.product.create({
      data: {
        sku: 'sku',
        productName: productName,
        price: parseInt(price),
        stock: parseInt(stock),
        details: details,
        category: {
          connectOrCreate: {
            where: {
              name: category
            },
            create: {
              name: category
            }
          }
        },
        brand: {
          connectOrCreate: {
            where: {
              name: brand
            },
            create: {
              name: brand
            }
          }
        }
      }
    })
    if (typeof product.id === 'undefined')
      throw response.throw({ message: "Can't create product!" })
    product = await this.#addSku(product.id, category, brand)
    if (typeof product.id === 'undefined') throw response.throw({ message: "Can't create sku!" })
    await this.disconnect()
    return response.normal({
      statusCode: 201,
      data: { product, message: 'Product created' }
    })
  }

  updateProduct = async req => {
    const id = req.params.id
    const { productName, price, stock, details = '', category, brand } = req.body
    if (typeof id === 'undefined') throw response.throw({ message: 'Invalid identifier' })
    if (!(productName && price && stock && category && brand))
      throw response.throw({ message: 'Invalid properties' })
    let product = await this.prisma.product.update({
      where: {
        id: parseInt(id)
      },
      data: {
        productName: productName,
        price: parseFloat(price),
        stock: parseInt(stock),
        details: details,
        category: {
          connectOrCreate: {
            where: {
              name: category
            },
            create: {
              name: category
            }
          }
        },
        brand: {
          connectOrCreate: {
            where: {
              name: brand
            },
            create: {
              name: brand
            }
          }
        }
      }
    })
    if (typeof product.id === 'undefined')
      throw response.throw({ message: "Can't update product!" })
    product = await this.#addSku(product.id, category, brand) //? Necessary?
    if (typeof product.id === 'undefined') throw response.throw({ message: "Can't create sku!" })
    await this.disconnect()
    return response.normal({
      statusCode: 201,
      data: { product, message: 'Product modificated' }
    })
  }

  deleteProduct = async req => {
    const { ids } = req.body //!array
    if (typeof ids === 'undefined') throw response.throw({ message: 'Invalid selection' })
    const { count } = await this.prisma.product.updateMany({
      where: {
        OR: ids.map(id => {
          return { id: parseInt(id) }
        })
      },
      data: {
        deleted: true
      }
    })
    if (count !== ids.length) throw response.throw({ message: 'Delete uncomplete' })
    return response.normal({
      data: { message: `${ids.length} products deleted` }
    })
  }

  #countProducts = async (sw = false) =>
    !sw
      ? await this.prisma.product.count()
      : await this.prisma.product.count({
          where: {
            deleted: false
          }
        })
  /**
   * Update the sku in the product
   * @param {Number} id
   * @param {String} category
   * @param {String} brand
   * @returns {Booleean} true if update was successful
   */
  #addSku = async (id, category, brand) => {
    const _category = await this.prisma.category.update({
      where: {
        name: category
      },
      data: {
        prodsQnt: { increment: 1 }
      }
    })
    const _brand = await this.prisma.brand.update({
      where: {
        name: brand
      },
      data: {
        prodsQnt: { increment: 1 }
      }
    })
    const sku = [_brand.id, _brand.prodsQnt - 1, _category.id, _category.prodsQnt - 1]
      .map(item => addZeros(item))
      .join('')
    return await this.prisma.product.update({
      where: {
        id: id
      },
      data: {
        sku: sku
      }
    })
  }
}
