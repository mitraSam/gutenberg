import { connect } from 'react-redux';
import {getCurrentBook} from '../actions/books-actions'

const mapStateToProps = ({books}) => ({currentBook: books.currentBook})
const mapDispatchToProps = (dispatch)=>({loadBook(title){dispatch(getCurrentBook(title))}})


const WithCurrentBook = connect(mapStateToProps, mapDispatchToProps)

export default WithCurrentBook

