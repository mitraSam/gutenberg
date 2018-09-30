import express from 'express'
import { userRouter } from './resources/user/index'
import { booksRouter } from './resources/books/index'
import { apiErrorHandler } from './modules/errorHandler'

export const restRouter = express.Router()

restRouter.use('/user', userRouter)
restRouter.use('/', booksRouter)
restRouter.use(apiErrorHandler)

