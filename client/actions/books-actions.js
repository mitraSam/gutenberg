/* eslint-disable consistent-return */
import localforage from "localforage";
import request from "axios";
import {LOAD_RECENT_BOOKS,SERVER_REQUEST_ERROR,LOAD_CURRENT_BOOK} from '../constants'



export const getRecentBooks = ()=> async (dispatch)=>{
        const recent = await localforage.getItem('recentBooks');
        if(recent){
            dispatch({type:LOAD_RECENT_BOOKS,recentBooks:recent})
            return recent
        }

            try{
                const {data} = await request.get('http://localhost:3000/books');
                await localforage.setItem('recentBooks', data);
                dispatch({type:LOAD_RECENT_BOOKS,recentBooks:data})
            }catch (error) {
                dispatch({type:SERVER_REQUEST_ERROR,error})
            }

};

export const getCurrentBook = (title)=> async (dispatch) =>{
console.log('running');

    try{
        const {data} = await request.get(`http://localhost:3000/book/${title}`);
        dispatch({type:LOAD_CURRENT_BOOK,currentBook:data})
    }catch (error) {
        dispatch({type:SERVER_REQUEST_ERROR,error})
    }

}

