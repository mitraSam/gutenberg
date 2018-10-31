import { generateControllers } from '../../modules/query'
import { User } from './user.model'

const UserController = generateControllers(User);

UserController.createUser = (req,res,next)=>{
    User.create(req.body)
        .then((newUser)=>{
            req.docFromId=newUser;
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

UserController.addBook = (req,res,next)=>{

    User.update(req.docFromId,
        { $addToSet: { "readBooks": req.headers.id } }
        )
.then(()=>{
        res.status(200).end()


    }).catch(e=>next(e));

}
export default UserController

