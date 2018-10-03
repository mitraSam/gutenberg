import request from "axios"
import {LOAD_SEARCH_RESULT,SERVER_REQUEST_ERROR} from "../constants"

export default  (searchTerm) =>async (dispatch) =>{
    try{
        const {data} = await request.get(`http://localhost:3000/search/${searchTerm}`);
        dispatch({type:LOAD_SEARCH_RESULT,search:data})
    }catch (error) {
        dispatch({type:SERVER_REQUEST_ERROR,error})
    }

}

