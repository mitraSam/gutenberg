import { generateControllers } from '../../modules/query'
import { User } from './user.model'

const UserController = generateControllers(User);

UserController.createUser = (req,res,next)=>{
    User.create(req.body)
        .then((newUser)=>{
            req.user=newUser;
            next()
        })
        .catch(error => {
            if(error.code === 11000 || error.code === 11001 ){
                res.status(500).send('username already taken')
            }else {
                next(error)
            }
})
}
export default UserController

