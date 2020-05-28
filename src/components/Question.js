import React from 'react';
import {connect} from 'react-redux';
import {formatQuestion} from "../utils/helperFunctions";
import {Link} from 'react-router-dom';

const Question = (props) => {
    const {question} = props;

    if (question === null) {
        return <p>This question doesn't exist.</p>
    }

    const {name, id, avatar, optionOne, optionTwo, hasVoted} = question;

    if (props.questionsToShow === 'answered' && hasVoted !== true) {
        return false;
    } else if (props.questionsToShow === 'unanswered' && hasVoted === true) {
        return false;
    }

    let viewPollLink = '';

    if (props.questionsToShow === 'answered') {
        viewPollLink = `/question/${id}/results`;
    } else if (props.questionsToShow === 'unanswered') {
        viewPollLink = `/question/${id}`;
    }

    return (
        <div>
            <div className="center">
                <div className="addsome">{name} asks would you rather...</div>
                <div>
                    <div>
                        <div className="user-infos">
                            <div className="img-avatar">
                                <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
                            </div>
                            <div>
                                <div>
                                    <p className='center'>{optionOne.text} <strong>OR</strong> {optionTwo.text}</p>
                                    <Link to={viewPollLink} className='center'>
                                        <button className="btn addsome">
                                            View Poll
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


function mapStateToProps({login, users, questions}, {id, questionsToShow}) {
    const question = questions[id];

    return {
        authedUser: login.loggedInUser.id,
        question: formatQuestion(question, users[question.author], login.loggedInUser.id),
        questionsToShow
    }
}

export default connect(mapStateToProps)(Question);