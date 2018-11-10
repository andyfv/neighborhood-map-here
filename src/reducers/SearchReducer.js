import C from '../actions/actionTypes';

const initialState = {
    defaultQuery: 'restaurant',
    results: [],
    fetching: false
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case C.FETCH_PLACES_STARTED:
            return Object.assign({}, state, {
                fetching: true
            })

        case C.FETCH_PLACES_SUCCEEDED:
            return Object.assign({}, state, {
                results: action.payload,
                fetching: false
            })
        default:
            return state;
    }
}