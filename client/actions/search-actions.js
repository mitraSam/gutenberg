import request from "axios"
import {LOAD_SEARCH_RESULT,SERVER_REQUEST_ERROR} from "../constants"


export default  (searchTerm) =>async (dispatch) =>{
    const api = process.env.API_URL;

    try{
        const res = await request.get(`${api}/search/${searchTerm}`);
        dispatch({type:LOAD_SEARCH_RESULT,search:res.data})
    }catch (error) {
        dispatch({type:SERVER_REQUEST_ERROR,error})
    }

}

