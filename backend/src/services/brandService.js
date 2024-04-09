import { PrismaClient } from '@prisma/client'
import { HttpError } from '../utils/error.js'

const prisma = new PrismaClient()

export const createBrand = async (name, callback) => {
  try {
    const brand = await prisma.brand.upsert({
      where: {
        name
      },
      update: {},
      create: {
        name
      }
    })

    if (!brand) throw new HttpError('Error while creating brand', 500)

    callback(null, brand)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}
