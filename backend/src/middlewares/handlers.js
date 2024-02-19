export const healthCheckHandler = (_, res) => {
  res.status(200).send('API is running...')
}

export const errorHandler = (err, _, res, next) => {
  if (err) {
    if (!err.publicError) console.error(err)
    res.status(err.status || 500).json({ error: err.publicError ? err.message : 'SERVER ERROR' })
    return
  }
  next()
}

export const notFoundHandler = (_, res) => {
  res.status(404).send('Not found')
}
