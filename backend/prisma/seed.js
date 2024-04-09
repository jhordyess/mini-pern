import { createBrand } from '../src/services/brandService.js'
import { createCategory } from '../src/services/categoryService.js'
import { createProduct } from '../src/services/productService/service.js'

const addBrands = async () => {
  try {
    const brands = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Nokia']

    for (const brand of brands) {
      await createBrand(brand, error => {
        if (error) throw new Error(error)
        console.log(`Brand ${brand} created successfully`)
      })
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const addCategories = async () => {
  try {
    const categories = ['Phones', 'Tablets', 'Laptops', 'Watches', 'Headphones']
    for (const category of categories) {
      await createCategory(category, error => {
        if (error) throw new Error(error)
        console.log(`Category ${category} created successfully`)
      })
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const addProducts = async () => {
  try {
    const products = [
      {
        productName: 'iPhone 13',
        price: 1000,
        stock: 10,
        details: 'This is iPhone 13',
        category: 'Phones',
        brand: 'Apple'
      },
      {
        productName: 'Samsung Galaxy S21',
        price: 800,
        stock: 5,
        details: 'This is Samsung Galaxy S21',
        category: 'Phones',
        brand: 'Samsung'
      },
      {
        productName: 'Xiaomi Mi 11',
        price: 700,
        stock: 8,
        details: 'This is Xiaomi Mi 11',
        category: 'Phones',
        brand: 'Xiaomi'
      },
      {
        productName: 'Huawei P30',
        price: 600,
        stock: 3,
        details: 'This is Huawei P30',
        category: 'Phones',
        brand: 'Huawei'
      },
      {
        productName: 'Nokia 3310',
        price: 500,
        stock: 6,
        details: 'This is Nokia 3310',
        category: 'Phones',
        brand: 'Nokia'
      }
    ]

    for (const product of products) {
      await createProduct(
        product.productName,
        product.price,
        product.stock,
        product.details,
        product.category,
        product.brand,
        error => {
          if (error) throw new Error(error)
          console.log(`Product ${product.productName} created successfully`)
        }
      )
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

await addBrands()
await addCategories()
await addProducts()
