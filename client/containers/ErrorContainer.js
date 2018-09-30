import {connect} from "react-redux";
import ErrorDisplay from "../js/ErrorDisplay";

const mapStateToProps = (state) => {
    console.log(state);
    return {error:state.error}
}
;

export default connect(mapStateToProps, null)(ErrorDisplay);
