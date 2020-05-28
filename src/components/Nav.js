import React from 'react';
import {Link} from 'react-router-dom';

const Nav = (loggedInUser) => {
    return (
        <div className="space">
            <nav>
                <div className='projectContainer'>
                    <div>
                        <ul>
                            <Link to='/' exact activeClassName='active'
                                     className="navbar">Home</Link>
                            <Link to='/add' exact activeClassName='active'
                                     className="navbar">New Question</Link>
                            <Link to='/leaderboard' exact activeClassName='active'
                                     className="navbar">Leader Board</Link>
                        </ul>

                        <span className="username">Hello {loggedInUser.loggedInUser.name}</span>
                        <span><Link to="/logout"><button className='btn-logout'>Logout</button></Link></span>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default Nav;