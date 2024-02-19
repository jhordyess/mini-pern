import { PrismaClient } from '@prisma/client'
import { HttpError } from '../../utils/error'
import { formatOrderBy, addZeros } from './util'

const prisma = new PrismaClient()

const relation = [
  { table: 'category', column: 'name' },
  { table: 'brand', column: 'name' }
]

export const listAllProducts = async (page = 0, rowsPerPage = 10, sortOrder = {}, callback) => {
  try {
    const products = await prisma.product.findMany({
      skip: page * rowsPerPage,
      take: rowsPerPage,
      orderBy: formatOrderBy(relation, sortOrder),
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

    const formatProducts = products.map((product = {}) => {
      relation.forEach(item => {
        product[item.table] = product[item.table][item.column]
      })
      return product
    })

    callback(null, formatProducts)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const getProduct = async (id, callback) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      },
      select: {
        productName: true,
        price: true,
        stock: true
      }
    })

    relation.forEach(item => {
      product[item.table] = product[item.table][item.column]
    })

    callback(null, product)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const getProductDetail = async (id, callback) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      },
      select: {
        details: true
      }
    })

    callback(null, product)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const createProduct = async (
  productName,
  price,
  stock,
  details,
  category,
  brand,
  callback
) => {
  try {
    const product = await prisma.product.create({
      data: {
        sku: 'sku',
        productName,
        price,
        stock,
        details,
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

    if (!product) throw new HttpError("Can't create product!", 500)

    const newProduct = await addSku(product.id, category, brand)

    if (!newProduct?.id) throw new HttpError("Can't create sku!", 500)

    callback(null, newProduct)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const updateProduct = async (
  id,
  productName,
  price,
  stock,
  details,
  category,
  brand,
  callback
) => {
  try {
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        productName,
        price,
        stock,
        details,
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

    if (!product) throw new HttpError("Can't update product!", 500)

    const newProduct = await addSku(product.id, category, brand)

    if (!newProduct?.id) throw new HttpError("Can't update sku!", 500)

    callback(null, newProduct)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const deleteProduct = async (ids, callback) => {
  try {
    const { count } = await prisma.product.updateMany({
      where: {
        OR: ids.map(id => ({
          id: parseInt(id)
        }))
      },
      data: {
        deleted: true
      }
    })

    if (count !== ids.length) throw new HttpError('Delete uncompleted', 500)

    callback(null, ids.length)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const countProducts = async () => {
  try {
    return await prisma.product.count({
      where: {
        deleted: false
      }
    })
  } catch (error) {
    console.error(error)
    return 0
  } finally {
    await prisma.$disconnect()
  }
}

const addSku = async (id, category, brand) => {
  try {
    const newCategory = await this.prisma.category.update({
      where: {
        name: category
      },
      data: {
        prodsQnt: { increment: 1 }
      }
    })
    const newBrand = await this.prisma.brand.update({
      where: {
        name: brand
      },
      data: {
        prodsQnt: { increment: 1 }
      }
    })
    const sku = [newBrand.id, newBrand.prodsQnt - 1, newCategory.id, newCategory.prodsQnt - 1]
      .map(item => addZeros(item))
      .join('')
    return await this.prisma.product.update({
      where: {
        id
      },
      data: {
        sku
      }
    })
  } catch (error) {
    console.error(error)
    return undefined
  } finally {
    await prisma.$disconnect()
  }
}
