export const apiErrorHandler = (error, req, res, next) => {
  console.error(error,'here')
  res.status(500).send(error.message)
}
