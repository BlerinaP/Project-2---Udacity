import {getUser} from '../utils/api';

export const SUCCESS_LOGIN = 'SUCCESS_LOGIN ';
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';

export function receiveAuthLogin(user) {
    return {
        type: SUCCESS_LOGIN,
        authenticated: true,
        loggedInUser: user
    }
}

export function receiveAuthLogout() {
    return {
        type: SUCCESS_LOGOUT,
        authenticated: null,
        loggedInUser: null
    }
}

export function handleLogin(id) {
    return (dispatch) => {
        getUser(id).then((user) => {
            dispatch(receiveAuthLogin(user));
        });
    };
}

export function handleLogout() {
    return (dispatch) => {
        dispatch(receiveAuthLogout());
    }
}