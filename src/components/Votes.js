import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAddAnswer} from '../actions';
import {Redirect} from "react-router-dom";
import PageNotFound from "./PageNotFound";

class Votes extends Component {

    state = {
        optionSelected: '',
        answerSubmitted: false
    };

    handleSubmit(e, questionId) {
        e.preventDefault();

        const dispatch = this.props.dispatch;
        const optionSelected = this.state.optionSelected;

        dispatch(handleAddAnswer(questionId, optionSelected));

        this.setState(() => ({
            optionSelected: '',
            answerSubmitted: true
        }));
    }

    handleInputChange = (e) => {
        const writtenText = e.target.value;

        this.setState(() => ({
            optionSelected: writtenText
        }));
    };

    render() {
        const {optionSelected, answerSubmitted} = this.state;
        const {id, question, author, pageNotFound} = this.props;

        if (pageNotFound === true) {
            return <PageNotFound/>;
        }

        const redirectTo = `/question/${id}/results`;

        if (answerSubmitted === true) {
            return <Redirect to={redirectTo}/>;
        }

        return (
            <div>
                <div className='projectContainer'>
                    <div className='container'>
                        <div className='main-box'>
                            <div className="box-container">
                                <div className="asking">
                                    <div>{author.name} asks would you rather...</div>
                                    <div>
                                        <div className='container'>
                                            <div>
                                                <div className="img-avatar">
                                                    <img src={author.avatarURL}
                                                         alt={`Avatar of ${author.name}`}
                                                         className='avatar'/>
                                                </div>
                                                <div>
                                                    <div>
                                                        <form onSubmit={(e) => this.handleSubmit(e, id)}>
                                                            <div className="form-check">
                                                                <input
                                                                       type="checkbox"
                                                                       name="questionPoll"
                                                                       id="optionOne"
                                                                       value="optionOne"
                                                                       onChange={this.handleInputChange}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="optionOne">
                                                                    {question.optionOne.text}
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input
                                                                       type="checkbox"
                                                                       name="questionPoll"
                                                                       id="optionTwo"
                                                                       value="optionTwo"
                                                                       onChange={this.handleInputChange}
                                                                />
                                                                <label
                                                                    htmlFor="exampleRadios2">
                                                                    {question.optionTwo.text}
                                                                </label>
                                                            </div>
                                                            <button className="btn"
                                                                type='submit'
                                                                disabled={optionSelected === ''}>
                                                                Submit
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({login, questions, users, match}, props) {
    const {id} = props.match.params;

    let pageNotFound = true;
    let author = "";
    let specificQuestion = "";

    if (questions[id] !== undefined) {
        pageNotFound = false;
        specificQuestion = questions[id];
        author = users[specificQuestion['author']];
    }

    return {
        id,
        question: specificQuestion,
        author: author,
        authedUser: login.loggedInUser.id,
        pageNotFound: pageNotFound
    }
}

export default connect(mapStateToProps)(Votes);