import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleGettingUsers} from '../actions/users';
import {handleLogin} from '../actions/authedUser';
import LoadingBar from "react-redux-loading";

class Login extends Component {
    state = {
        userSelected: ''
    };

    componentDidMount() {
        this.props.dispatch(handleGettingUsers());
    }

    handleChange = (e) => {
        const userSelected = e.target.value;

        this.setState(() => ({
            userSelected
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const dispatch = this.props.dispatch;

        dispatch(handleLogin(this.state.userSelected));
    };

    render() {
        if (this.props.loading === true || !this.props.users) {
            return <div/>;
        }

        const {from} = this.props.location.state || {from: {pathname: '/'}};

        if (this.props.isAuthed) {
            return <Redirect to={from}/>;
        }

        return (
            <div>
                <LoadingBar />
                <div className="container">
                    <div className="login-form">
                        <h1>Login Form</h1>
                        <div className="main-div bg-dark">
                            <div className="panel">
                                <h2>Login</h2>
                                <p>Please select a user to log in as.</p>
                            </div>
                            <form id="Login" onSubmit={this.handleSubmit}>
                                <div className="select">
                                    <select id="userId"
                                            onChange={(e) => this.handleChange(e)}>
                                        {
                                            Object.keys(this.props.users).map((user) => {
                                                return <option key={this.props.users[user].id}
                                                               value={this.props.users[user].id}>{this.props.users[user].name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <button type="submit" className="btn" disabled={this.state.userSelected === ''}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({users, login}) {
    return {
        loading: users === null,
        users,
        isAuthed: login.authenticated
    }
}

export default connect(mapStateToProps)(Login);