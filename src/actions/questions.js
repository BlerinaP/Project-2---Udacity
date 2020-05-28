import {getQuestions} from '../utils/api';

export const GET_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

export function receiveQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function addQuestionAnswer(authedUser, questionId, selectedOption) {
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        questionId,
        selectedOption
    }
}

export function handleQuestions() {
    return (dispatch) => {
        return getQuestions()
            .then((questions) => {
                dispatch(receiveQuestions(questions));
            });
    }
}