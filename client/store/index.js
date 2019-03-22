import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import reducer from '../reducers';
import{ getRecentBooks } from '../actions/books-actions'

const middleWare = [thunk];

const store = createStore(
    reducer,
    {books:{currentBook:{},currentChapter:{},recentBooks:[]},error:{},search:[]},
    applyMiddleware(...middleWare)
);



store.dispatch(getRecentBooks())

export default store

