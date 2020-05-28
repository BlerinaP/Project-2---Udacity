import {getUsers} from "../utils/api";
export const GET_USERS = 'GET_USERS';
export const ADD_USER_ANSWER = 'ADD_USER_QUESTION_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function getUssers(users) {
    return {
        type: GET_USERS,
        users
    }
}

export function addUserQuestion(question) {
    return {
        type: ADD_USER_QUESTION,
        question
    }
}

export function addUserQuestionAnswer(authedUser, questionId, selectedOption) {
    return {
        type: ADD_USER_ANSWER,
        authedUser,
        questionId,
        selectedOption
    }
}

export function handleGettingUsers() {
    return (dispatch) => {
        return getUsers()
            .then((users) => {
                dispatch(getUssers(users));
            });
    }
}