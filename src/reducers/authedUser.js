import {SUCCESS_LOGIN, SUCCESS_LOGOUT} from "../actions/authedUser";

export default function authedUser(state = {}, action) {
    switch (action.type) {
        case SUCCESS_LOGIN:
            return {
                ...state,
                authenticated: action.authenticated,
                loggedInUser: action.loggedInUser
            };
        case SUCCESS_LOGOUT:
            return {
                ...state,
                authenticated: action.authenticated,
                loggedInUser: action.loggedInUser
            };
        default:
            return state;
    }
}