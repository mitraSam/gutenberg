/* eslint-disable no-use-before-define,no-underscore-dangle, consistent-return */
import localforage from "localforage";
import request from "axios";
import {LOAD_RECENT_BOOKS,SERVER_REQUEST_ERROR,LOAD_CURRENT_BOOK,SET_CURRENT_BOOK,LOAD_CURRENT_CHAPTER} from '../constants'




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
        const {data} = await request.get(`${api}/book/${title}`);
        dispatch({type:LOAD_CURRENT_BOOK,currentBook:data})

    }catch (error) {
        dispatch({type:SERVER_REQUEST_ERROR,error})
    }

};



export const getCurrentChapter = (chapterId)=> async (dispatch) =>{
    const api = process.env.API_URL;
    try{
        const {data} = await request.get(`${api}/chapter/${chapterId}`);
        dispatch({type:LOAD_CURRENT_CHAPTER,currentChapter:data})
    }catch (error) {
        dispatch({type:SERVER_REQUEST_ERROR,error})
    }

};





export const setCurrentBook = (book)=> async (dispatch) =>{

    dispatch({type:SET_CURRENT_BOOK,currentBook:book})

}


