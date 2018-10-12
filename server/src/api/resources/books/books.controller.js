import { generateControllers } from '../../modules/query'
import { Books } from './books.model'


const BooksController = generateControllers(Books)


export default BooksController
