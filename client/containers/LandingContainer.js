import { connect } from 'react-redux';
import Landing from "../js/Landing";


const mapStateToProps = ({books}) => ({books: books.recentBooks})




export default connect(mapStateToProps, null)(Landing);
