import {combineReducers} from 'redux'


import books from './books-reducer';
import error from './error-reducer';


export default combineReducers({
    books,
    error
});

