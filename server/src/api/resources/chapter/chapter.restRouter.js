import express from 'express'
import chapterController from '../chapter/chapter.controller'

export const chapterRouter = express.Router();

chapterRouter.param('id', chapterController.findById);


chapterRouter.route('/').post(chapterController.create);
chapterRouter.route('/').get(chapterController.getAll);

chapterRouter.route('/:id').get(chapterController.getOne)


