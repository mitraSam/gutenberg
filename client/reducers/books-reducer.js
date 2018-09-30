/* eslint-disable consistent-return,no-unused-vars,no-param-reassign */
import {LOAD_RECENT_BOOKS,LOAD_CURRENT_BOOK} from "../constants";


export default function (state={},action) {
    if(action.type===LOAD_RECENT_BOOKS){
       return {...state,recentBooks:action.recentBooks}
    }
    if(action.type===LOAD_CURRENT_BOOK){
        return{...state,currentBook:action.currentBook}
    }
    return state
}