import express from 'express'
import booksController from './books.controller'


export const booksRouter = express.Router();

booksRouter.param('id', booksController.findByTitle);
booksRouter.param('searchTerm', booksController.findBySearchTerm);

booksRouter.route('/books')
  .get(booksController.getRecentPreview)
  .post(booksController.createOne);


booksRouter.route('/search/:searchTerm').get(booksController.getSearchResult)


booksRouter.route('/book/:id')
    .get(booksController.getOne)
    .put(booksController.updateOne)
    .delete(booksController.deleteOne)
