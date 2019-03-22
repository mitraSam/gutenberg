import { connect } from 'react-redux';
import {getCurrentBook, getCurrentChapter} from '../actions/books-actions'

const mapStateToProps = ({books}) => ({currentBook: books.currentBook,currentChapter:books.currentChapter})
const mapDispatchToProps = (dispatch)=>({loadBook(title,chapterNr){dispatch(getCurrentBook(title,chapterNr))},loadChapter(chapterId){dispatch(getCurrentChapter(chapterId))}})


const WithCurrentBook = connect(mapStateToProps, mapDispatchToProps)

export default WithCurrentBook

