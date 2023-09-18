import { Router } from 'express'

export const BaseRouter = (routes = []) => {
  let router = Router()

  for (let route of routes) {
    const aux = async (req, res) => {
      let result = {}
      try {
        result = await route.func(req, res)
      } catch (error) {
        if (!error.publicError) console.error(error?.message || error)
        result = {
          statusCode: error?.statusCode || 500,
          status: error?.status || 'FAILED',
          data: {
            error: !error.publicError
              ? 'Please review the logs'
              : error?.message || 'An error?, Yeah, but where?'
          }
        }
      } finally {
        const { statusCode, status, data } = result
        res.status(statusCode || 500).json({ status, data })
      }
    }

    switch (route.method) {
      case 'GET':
        router.get(route.path, aux)
        break
      case 'POST':
        router.post(route.path, aux)
        break
      case 'PUT':
        router.put(route.path, aux)
        break
      case 'DELETE':
        router.delete(route.path, aux)
        break
      default:
        break
    }
  }
  return router
}
