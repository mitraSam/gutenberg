import {combineReducers} from 'redux'


import books from './books-reducer';
import error from './error-reducer';
import search from './search-reducer'


export default combineReducers({
    books,
    error,
    search
});

