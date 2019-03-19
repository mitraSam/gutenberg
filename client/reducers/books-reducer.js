import {LOAD_RECENT_BOOKS,LOAD_CURRENT_BOOK,SET_CURRENT_BOOK} from "../constants";


export default function (state={},action) {
    if(action.type===LOAD_RECENT_BOOKS){
       return {...state,recentBooks:action.recentBooks}
    }
    if(action.type===LOAD_CURRENT_BOOK){
        return{...state,currentBook:action.currentBook}
    }
    if(action.type===SET_CURRENT_BOOK){
        return{...state,currentBook:action.currentBook}
    }
    return state
}