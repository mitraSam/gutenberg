import express from 'express'
import userController from './user.controller'
import {protect,signin} from "../../modules/auth"

export const userRouter = express.Router()



userRouter.route('/')
  .post(userController.createUser,signin)


userRouter.use(protect)
userRouter.route('/id')
    .get(userController.returnOne)
    .put(userController.addBook)
    .delete(userController.createOne)