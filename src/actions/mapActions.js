import C from './actionTypes';
import { loadMapLibs, initMap } from '../utils/HereMapsAPI';

export function mapLoadAndInit(defaultLocation) {
    return ((dispatch, getState) => 
        loadMapLibs()
        .then(() => initMap(defaultLocation))
        // dispatch an action that will open a modal with the error message
        .catch(error => dispatch()) 
    )()
}