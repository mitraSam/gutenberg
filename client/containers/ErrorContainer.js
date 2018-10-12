import {connect} from "react-redux";
import ErrorDisplay from "../js/ErrorDisplay";

const mapStateToProps = (state) => ({error:state.error})



export default connect(mapStateToProps, null)(ErrorDisplay);
