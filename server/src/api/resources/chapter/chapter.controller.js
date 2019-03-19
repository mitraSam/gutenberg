import { generateControllers } from '../../modules/query'
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
        .then((chapter)=>Books.update(req.book,{ $addToSet: { "chapters": chapter._id } })
            .then(res.status(201).json(chapter))
        )
        .catch(e=>next(e))
};


export default chapterController
