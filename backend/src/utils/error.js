export class HttpError extends Error {
  constructor(message = 'SERVER ERROR', status = 500, publicError = true) {
    super(message)
    this.status = status
    this.publicError = publicError
  }
}
