import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './Home';
import NewQuestion from './NewQuestion';
import QuestionPoll from './Votes';
import QuestionResults from './VotingRes';
import Board from './Board';
import Nav from './Nav';
import Login from './Login';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import {handleQuestions} from "../actions/questions";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleQuestions());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    {this.props.authenticated == null
                        ? null
                        : <Nav loggedInUser={this.props.loggedInUser}/>
                    }
                    <div>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Switch>
                                    <ProtectedRoute path='/' exact component={Home}
                                                    isAuthenticated={this.props.authenticated}/>
                                    <ProtectedRoute path='/question/:id' exact component={connect(mapStateToProps)(QuestionPoll)}
                                                    isAuthenticated={this.props.authenticated}/>
                                    <ProtectedRoute path='/question/:id/results'
                                                    exact component={connect(mapStateToProps)(QuestionResults)}
                                                    isAuthenticated={this.props.authenticated}/>
                                    <ProtectedRoute path='/add' exact component={NewQuestion}
                                                    isAuthenticated={this.props.authenticated}/>
                                    <ProtectedRoute path='/leaderboard' exact component={Board}
                                                    isAuthenticated={this.props.authenticated}/>
                                    <Route path="/login" exact component={withRouter(Login)}/>
                                    <Route path="/logout" exact component={withRouter(Logout)}/>
                                    <Route component={PageNotFound} />
                                </Switch>
                            </div>
                        }

                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({users, login}) {
    return {
        loading: false,
        loggedInUser: login.loggedInUser,
        authenticated: login.authenticated
    }
}

export default connect(mapStateToProps)(App);
