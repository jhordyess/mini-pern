import { PrismaClient } from '@prisma/client'
import { HttpError } from '../utils/error.js'

const prisma = new PrismaClient()

export const createCategory = async (name, callback) => {
  try {
    const category = await prisma.category.upsert({
      where: {
        name: name
      },
      update: {},
      create: {
        name: name
      }
    })

    if (!category) throw new HttpError('Error while creating category', 500)

    callback(null, category)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}
