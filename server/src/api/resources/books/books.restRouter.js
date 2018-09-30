import express from 'express'
import booksController from './books.controller'

export const booksRouter = express.Router()

booksRouter.param('id', booksController.findByParam)

booksRouter.route('/')
  .get(booksController.getRecentPreview)
  .post(booksController.createOne)


booksRouter.route('/:id')
    .get(booksController.getOne)
    .put(booksController.updateOne)
    .delete(booksController.deleteOne)
