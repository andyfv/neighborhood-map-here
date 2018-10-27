import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/index';
import thunk from 'redux-thunk';

const initialState = {
    query: '',
    places: [],
    toggleListVisibility: false,
    error: null,
    map: {
        defaultLocation: {lat: 42.688730,lng: 23.320168},
        isMapLoaded: false,
        fetching: false
    }
}

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, reduxImmutableStateInvariant() )
    );
}

