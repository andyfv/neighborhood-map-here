import C from './actionTypes';
import { errorCaught } from './errorActions';
import { loadMapLibs, initMap, createInfoBubble } from '../utils/HereMapsAPI';

export function loadMapSucceeded() {
    return {
        type: C.LOAD_MAP_SUCCEEDED
    }
}

export function mapLoadAndInit(defaultLocation) {
    return (dispatch, getState) => {
        return loadMapLibs()
            .then(() => dispatch(loadMapSucceeded()))
            .then(() => initMap(defaultLocation))
            // dispatch an action that will open a modal with the error message
            .catch(error => 
                dispatch(errorCaught(`Loading map failed: (${error})`)))
    }
}

export function openInfoBubble(index) {
    return (dispatch, getState) => {
        // Sometimes clicking on a border returns undefined and breaks the chain
        if (index !== undefined) {
            return Promise.resolve(createInfoBubble(getState().search.results[index]))
        }
    }
}