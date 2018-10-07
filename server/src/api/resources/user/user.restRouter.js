import express from 'express'
import userController from './user.controller'
import {protect} from "../../modules/auth"

export const userRouter = express.Router()

userRouter.param('id', userController.findByParam)

userRouter.route('/')
  .get(userController.getAll)
  .post(userController.createOne)

userRouter.use(protect)
userRouter.route('/:id')
  .get(userController.getOne)
  .put(userController.updateOne)
  .delete(userController.createOne)
