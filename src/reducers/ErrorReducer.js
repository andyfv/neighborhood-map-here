import C from '../actions/actionTypes';


export const errorReducer = (state = null, action) => {
    switch (action.type) {
        case C.ERROR_CAUGHT:
            return action.payload;
        case C.ERROR_CLEAR:
            return null;
        default:
            return state;
    }
}