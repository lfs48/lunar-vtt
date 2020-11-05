import { session } from 'passport';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/session_actions';
import { useHistory } from 'react-router-dom';

const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {isLoggedIn} = useSelector(
        state => ({
            isLoggedIn: state.session.isLoggedIn
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

    return(
        <nav>
            {isLoggedIn ?
                <button onClick={e => handleLogout(e)}>Log Out</button>
            :
                <button onClick={e => handleLogin(e)}>Log In</button>
            }
        </nav>
    );
};

export default Navbar;