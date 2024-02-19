import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import productRouter from './routes/product/router.js'
import categoryRouter from './routes/category/router.js'
import brandRouter from './routes/brand/router.js'
import { errorHandler, healthCheckHandler, notFoundHandler } from './middlewares/handlers.js'

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))

// Health check
app.get('/', healthCheckHandler)

// Routes
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/brand', brandRouter)

// Error handler
app.use(errorHandler)

// Not found handler
app.use('*', notFoundHandler)

app.listen(port, () => {
  console.log('Server initialized on port ' + port)
})
