import { generateControllers} from '../../modules/query'
import { Chapter } from './chapter.model'
import {Page} from "../page/page.model";
import {Books} from "../books/books.model";

const chapterController = generateControllers(Chapter)

chapterController.create = (req,res,next)=>{
    async function createChapter(pages){
        const promisedPages = [];
        try {
            pages.forEach((page) => promisedPages.push(Page.create(page)))
            const finishedPages = await Promise.all(promisedPages);
            req.body.contents = finishedPages.map(page=>page._id)
            return await Chapter.create(req.body)

        }catch (e) {
            next(e)
        }
    }
    createChapter(req.body.contents)
        .then((chapter)=>{
            Books.update({_id:req.body.book},{ $addToSet: { "chapters": chapter._id } })
                    .then(res.status(201).json(chapter))
            }
        )
        .catch(e=>next(e))
};

chapterController.findById = (req,res,next,id)=>{
    return findById(id).then(doc=>{
        if(!doc){
            next(new Error('Find by ID not found'))
        }
        else{
            req.docFromId = doc
            next()
        }
    }).catch(error=>{
        next(error)
    })
}

function findById(id){
    return Chapter.findOne({_id:id}).populate('contents').exec()
}


export default chapterController
