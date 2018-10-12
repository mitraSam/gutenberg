/* eslint-disable consistent-return */
import localforage from "localforage";
import request from "axios";
import {LOAD_RECENT_BOOKS,SERVER_REQUEST_ERROR,LOAD_CURRENT_BOOK,SET_BOOK_DETAILS} from '../constants'




export const getRecentBooks = ()=> async (dispatch)=>{
        const recent = await localforage.getItem('recentBooks');
        const api = process.env.API_URL;

      if(recent){
            dispatch({type:LOAD_RECENT_BOOKS,recentBooks:recent})
            return recent
        }

            try{
                const {data} = await request.get(`${api}/books`);
                await localforage.setItem('recentBooks', data);
                dispatch({type:LOAD_RECENT_BOOKS,recentBooks:data})
            }catch (error) {
                dispatch({type:SERVER_REQUEST_ERROR,error})
            }

};

export const getCurrentBook = (title)=> async (dispatch) =>{
    const api = process.env.API_URL;
    try{
        const {data} = await request.get(`${api}/book/${title}`,{params:{contents:'true'}});
        dispatch({type:LOAD_CURRENT_BOOK,currentBook:data})
    }catch (error) {
        dispatch({type:SERVER_REQUEST_ERROR,error})
    }

}
export const getBookDetails = (title)=> async (dispatch) =>{
    const api = process.env.API_URL;
    try{
        const {data} = await request.get(`${api}/book/${title}`);
        dispatch({type:SET_BOOK_DETAILS,bookDetails:data})
    }catch (error) {
        dispatch({type:SERVER_REQUEST_ERROR,error})
    }

}

export const setBookDetails = (book)=> async (dispatch) =>{

    dispatch({type:SET_BOOK_DETAILS,bookDetails:book})

}


