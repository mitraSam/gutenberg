import { connect } from 'react-redux';
import getSearchResult from '../actions/search-actions'

const mapStateToProps = ({search}) => ({search})
const mapDispatchToProps = (dispatch)=>({searchForTerm(searchTerm){dispatch(getSearchResult(searchTerm))}})


const WithSearchFn = connect(mapStateToProps, mapDispatchToProps)
export default WithSearchFn

