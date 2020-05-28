import React from 'react';
import connect from "react-redux/es/connect/connect";

const Board = (props) => {
    const {users} = props;

    let usersInfo = Object.keys(users).map((key, index) => {
        let questionsAnswered = Object.keys(users[key].answers).length;
        let questionsAsked = Object.keys(users[key].questions).length;

        return {
            'name': users[key].name,
            'avatar': users[key].avatarURL,
            'questionsAnswered': questionsAnswered,
            'questionsAsked': questionsAsked,
            'totalScore': questionsAnswered + questionsAsked
        }
    });

    usersInfo.sort((a, b) => {
        if (b.totalScore < a.totalScore) return -1;
        if (b.totalScore > a.totalScore) return 1;
        return 0;
    });

    return (
        <div>
            <div className='projectContainer'>
                <div className='container'>
                     {usersInfo.map((user, index) => {
                           return (
                               <div key={index}>
                                   <div className="center">
                                        <div>{user.name}</div>
                                            <div>
                                                <div className='container'>
                                                    <div className="user-infos">
                                                        <div className="img-avatar">
                                                            <img src={user.avatar} alt={`Avatar of ${user.name}`}
                                                                 className='avatar'/>
                                                        </div>
                                                        <div >
                                                            <p className='m-30-top'><strong><span
                                                                className='p-5-right'>Answered Questions:</span></strong>
                                                                <span >{user.questionsAnswered}</span>
                                                                </p>
                                                            <p><span><strong>Created Questions:</strong></span>
                                                                <span>{user.questionsAsked}</span>
                                                                </p>
                                                        </div>
                                                        <div>
                                                          <div className='container'>
                                                             <div>
                                                               <h2><span>{user.totalScore}</span>
                                                                </h2>
                                                             </div>
                                                        </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                            )
                        })}
                     </div>
              </div>
        </div>
    )
};

function mapStateToProps({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Board);