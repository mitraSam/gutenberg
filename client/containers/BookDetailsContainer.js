import { connect } from 'react-redux';
import {getBookDetails} from '../actions/books-actions'

const mapStateToProps = ({books}) => ({bookDetails: books.bookDetails})
const mapDispatchToProps = (dispatch)=>({loadBookDetails(title){dispatch(getBookDetails(title))}})


const WithBookDetails = connect(mapStateToProps, mapDispatchToProps)

export default WithBookDetails

