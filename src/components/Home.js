import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';

class Dashboard extends Component {

    state = {
        'questionsToShow': 'unanswered',
        'activeTab': 'unanswered'
    };

    handleTabChange = (e, tab) => {
        this.setState(() => ({
            questionsToShow: tab,
            activeTab: tab
        }));
    };

    render() {
        const {questionsToShow, activeTab} = this.state;

        return (
            <div>
                <div className='projectContainer'>
                    <div className='container'>
                        <div className="align-center">
                            <div className="home">
                                <div className='center'>
                                    <button type='button'
                                            className={"btn-info " + (activeTab === 'unanswered' ? 'active' : null)}
                                            onClick={(e) => this.handleTabChange(e, 'unanswered')}>Unanswered
                                        Questions
                                    </button>
                                    <button type='button'
                                            className={"btn-info " + (activeTab === 'answered' ? 'active' : null)}
                                            onClick={(e) => this.handleTabChange(e, 'answered')}>Answered
                                        Questions
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                {this.props.questionIds.map((id) => {
                                    return (
                                        <Question key={id} id={id}
                                        questionsToShow={questionsToShow}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions}) {
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);