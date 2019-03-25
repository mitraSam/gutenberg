import {controllers, generateControllers} from '../../modules/query'
import { Books } from './books.model'


const booksController = generateControllers(Books)

booksController.getRecentPreview = (req, res, next) => getRecentPreview()
    .then(docs => res.json(docs))
    .catch(error => next(error))

booksController.findByTitle = (req, res, next, id) =>{
    return findByTitle(id).then(doc=>{
        if(!doc){
            next(new Error('Find by param not Found'))
        }
        else{
            req.docFromId = doc
            next()
        }
    }).catch(error=>{
        next(error)
    })
};


booksController.findBySearchTerm = (req, res, next, searchTerm) =>findBySearchTerm(searchTerm).then(doc=>{
    if(!doc.length){
        res.json({message:'found nothing...'})
    }
    else{
        req.docsFromSearch = doc
        next()
    }
}).catch(error=>{
    next(error)
})


function findBySearchTerm(searchTerm){
    const expression = new RegExp(searchTerm, 'i');
    return Books.find({}).or([{ 'author': { $regex: expression }}, { 'title': { $regex: expression }}]).populate('chapters','title bookPages')
}


function getRecentPreview(){
    return Books.find({}).sort('-date').limit(5).populate('chapters','title bookPages').exec()
}

function findByTitle(id) {
    return Books.findOne({title:id}).populate('chapters','title bookPages').exec()
}


export default booksController
