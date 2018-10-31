export const apiErrorHandler = (error, req, res, next) => {
  console.error(error,'here')

  res.status(error.status).send(error.message)
}
