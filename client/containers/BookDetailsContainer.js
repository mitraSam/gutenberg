import { connect } from 'react-redux';
import {getCurrentBook} from '../actions/books-actions'

const mapStateToProps = ({books}) => ({currentBook: books.currentBook})
const mapDispatchToProps = (dispatch)=>({loadBookDetails(title){dispatch(getCurrentBook(title))}})


const WithBookDetails = connect(mapStateToProps, mapDispatchToProps)

export default WithBookDetails

