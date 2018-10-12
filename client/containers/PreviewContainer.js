import { connect } from 'react-redux';
import Preview from "../js/Preview";
import {setBookDetails} from "../actions/books-actions";


const mapDispatchToProps = (dispatch)=>({setBookDetails(book){console.log(book,'from container');dispatch(setBookDetails(book))}})




export default connect(null, mapDispatchToProps)(Preview);
