import C from '../actions/actionTypes';

const initialState = {
    isMapLoaded: false,
    location: {
        lat: 42.688730,
        lng: 23.320168
    },
    searchRadius: 5000
};

export const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case C.LOAD_MAP_SUCCEEDED:
            return Object.assign({}, state, {
                isMapLoaded: true
            })
        default:
            return state;
    }
}