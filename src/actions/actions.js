import C from './actionTypes'
/* 
    Action creators:
 */

 export const requestPlaces = query => ({
        type: C.FETCH_PLACES_STARTED,
        payload: query
    });

 export const toggleList = () => ({type: C.TOGGLE_LIST_VIEW})

 export const selectPlace = id => ({type: C.SELECT_PLACE, payload: id})

 export const searchPlace = query => ({type: C.SEARCH_PLACE, payload: query})
