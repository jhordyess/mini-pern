import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import process from 'process'

import productRouter from './routes/product.routes.js'
import categoryRouter from './routes/category.routes.js'
import brandRouter from './routes/brand.routes.js'

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //?
app.use(cors({ origin: '*' }))

app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/brand', brandRouter)

app.listen(port, () => {
  console.log('Server initialized')
})
