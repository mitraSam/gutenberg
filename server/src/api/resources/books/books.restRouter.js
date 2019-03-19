import express from 'express'
import booksController from './books.controller'
import chapterController from '../chapter/chapter.controller'

export const booksRouter = express.Router();

booksRouter.param('id', booksController.findByParam);
booksRouter.param('searchTerm', booksController.findBySearch);

booksRouter.route('/books')
  .get(booksController.getRecentPreview)
  .post(booksController.createOne);

booksRouter.route('/books/chapter').post(chapterController.create);

booksRouter.route('/search/:searchTerm').get(booksController.getSearchResult)


booksRouter.route('/book/:id')
    .get(booksController.getOne)
    .put(booksController.updateOne)
    .delete(booksController.deleteOne)
