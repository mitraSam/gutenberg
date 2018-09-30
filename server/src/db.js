import mongoose from 'mongoose'
mongoose.Promise = global.Promise

export const connect = () => {
  return mongoose.connect('mongodb://samo:admin12@ds159782.mlab.com:59782/dbforme', {
    useMongoClient: true
  })
}
