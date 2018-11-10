import C from '../actions/actionTypes';

const initialState = {
    isListVisible: true
}

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case C.TOGGLE_LIST_VISIBILITY:
            return Object.assign({}, state, {
                isListVisible: !state.isListVisible
            })
        default:
            return state;
    }
}