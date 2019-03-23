import { connect } from 'react-redux';
import {getCurrentChapter} from '../actions/books-actions'

const mapStateToProps = ({books}) => ({currentChapter: books.currentChapter})
const mapDispatchToProps = (dispatch)=>({loadChapter(id){dispatch(getCurrentChapter(id))}})


const WithCurrentChapter = connect(mapStateToProps, mapDispatchToProps)

export default WithCurrentChapter



