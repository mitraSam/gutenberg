import {LOAD_SEARCH_RESULT} from "../constants";


export default function (state={},action) {
    if(action.type===LOAD_SEARCH_RESULT){
        return action.search
    }
    return state

}
