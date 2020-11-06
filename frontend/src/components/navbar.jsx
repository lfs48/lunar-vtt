import { session } from 'passport';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/session_actions';
import { useHistory } from 'react-router-dom';

const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {isLoggedIn, user} = useSelector(
        state => ({
            isLoggedIn: state.session.isLoggedIn,
            user: state.session.user
        })
    );

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch( logout() );
    }

    const handleLogin = (event) => {
        event.preventDefault();
        history.push("/login");
    }

    const handleRegister = (event) => {
        event.preventDefault();
        history.push("/register");
    }

    return(
        <nav>
            {isLoggedIn ?
                <section>
                    <h1>{user.username}</h1>
                    <button onClick={e => handleLogout(e)}>Log Out</button>
                </section>
            :
                <section>
                    <button onClick={e => handleLogin(e)}>Log In</button>
                    <button onClick={e => handleRegister(e)}>Register</button>
                </section>

            }
        </nav>
    );
};

export default Navbar;