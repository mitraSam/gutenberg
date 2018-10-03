import { connect } from 'react-redux';
import getSearchResult from '../actions/search-actions'
import Search from '../js/Search'

const mapStateToProps = ({search}) => ({search})
const mapDispatchToProps = (dispatch)=>({searchForTerm(searchTerm){dispatch(getSearchResult(searchTerm))}})



export default connect(mapStateToProps, mapDispatchToProps)(Search)

