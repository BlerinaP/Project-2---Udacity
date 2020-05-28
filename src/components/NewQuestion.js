import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAddingQuestion} from '../actions';
import {Redirect} from 'react-router-dom';

class NewQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        toDashboard: false,
        hasSubmitted: false
    };

    handleOptOneTextChange = (e) => {
        const text = e.target.value;

        this.setState({
            optionOneText: text
        });
    };

    handleOptTwoTextChange = (e) => {
        const text = e.target.value;

        this.setState({
            optionTwoText: text
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOneText, optionTwoText} = this.state;
        const dispatch = this.props.dispatch;

        this.setState({
            hasSubmitted: true
        });

        dispatch(handleAddingQuestion(optionOneText, optionTwoText, () => {
            this.setState({
                optionOneText: '',
                optionTwoText: '',
                toDashboard: true
            });
        }));
    };

    render() {
        const {
            optionOneText,
            optionTwoText,
            toDashboard,
            hasSubmitted
        } = this.state;

        if (toDashboard === true) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className='projectContainer'>
                    <div className='container'>
                        <div className="newQuestion">
                                <div className="newQs-container">
                                    <div className="title">Create New Question</div>
                                    <div>
                                        <div className='container'>
                                           <p><strong>Would You Rather...?</strong></p>
                                              <form onSubmit={this.handleSubmit}>
                                                 <div>
                                                     <input
                                                         className="input-style"
                                                          placeholder='Enter option one text here...'
                                                          value={optionOneText}
                                                          onChange={this.handleOptOneTextChange}
                                                       />
                                                        </div>
                                                        <div >
                                                            <input
                                                                className="input-style"
                                                                placeholder='Enter option two text here...'
                                                                value={optionTwoText}
                                                                onChange={this.handleOptTwoTextChange}
                                                            />
                                                        </div>
                                                        <input type='submit'
                                                           name='submit'
                                                           className="input-style"
                                                           id='submit'
                                                           value={hasSubmitted ? "Submitting Question..." : "Submit"}
                                                           disabled={
                                                           optionOneText === '' ||
                                                           optionTwoText === '' ||
                                                           hasSubmitted
                                                    } />
                                              </form>
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

export default connect()(NewQuestion);