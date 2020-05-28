import {combineReducers} from 'redux';
import users from './users';
import questions from './questions';
import login from './authedUser';
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    users,
    questions,
    login,
    loadingBar: loadingBarReducer,
});