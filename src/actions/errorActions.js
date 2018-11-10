import C from './actionTypes';

export function errorCaught(error) {
    return {
        type: C.ERROR_CAUGHT,
        payload: error
    }
}

export function clearError() {
    return {
        type: C.ERROR_CLEAR
    }
}