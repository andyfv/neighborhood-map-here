import C from './actionTypes';
import { errorCaught } from './errorActions';
import { searchPlaces, clearMarkers } from '../utils/HereMapsAPI';

export function fetchPlacesStarted(query) {
    return {
        type: C.FETCH_PLACES_STARTED,
        payload: query
    }
}

export function fetchPlacesSucceeded(places) {
    clearMarkers();
    return {
        type: C.FETCH_PLACES_SUCCEEDED,
        payload: places
    }
}

export function fetchPlaces(query, cat) {
    return function (dispatch, getState) {
        return Promise.resolve(dispatch(fetchPlacesStarted()))
            .then(() => searchPlaces(query, cat))
            .then(results => 
                Promise.resolve(dispatch(fetchPlacesSucceeded(results))))
            .catch(error => 
                dispatch(errorCaught(`Loading results failed: (${error})`)))
    }
}