export const apiErrorHandler = (error, req, res, next) => {
  console.error(error,'here')

    if(error.code === 11000 || error.code === 11001 ) {

        res.writeHead(500, 'book already registered', {'content-type' : 'text/plain'});
        return res.end()

    }
  res.status(error.status).send(error.message)
}
