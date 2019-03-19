import { connect } from 'react-redux';
import Preview from "../js/Preview";
import {setCurrentBook} from "../actions/books-actions";


const mapDispatchToProps = (dispatch)=>({setBookDetails(book){dispatch(setCurrentBook(book))}})




export default connect(null, mapDispatchToProps)(Preview);
