import { generateControllers } from '../../modules/query'
import { Chapter } from './chapter.model'
import {Page} from "../page/page.model";

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
    createChapter(req.body.contents).then(chapter=>res.status(201).json(chapter)).catch(e=>next(e))
};


export default chapterController
