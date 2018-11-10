import { combineReducers } from 'redux';
import { searchReducer } from './SearchReducer';
import { mapReducer } from './MapReducer';
import { errorReducer } from './ErrorReducer';
import { listReducer } from './ListReducer';

export const rootReducer = combineReducers({
    search: searchReducer,
    map: mapReducer,
    error: errorReducer,
    list: listReducer
})