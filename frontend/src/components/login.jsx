import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {merge} from 'lodash';
import { login } from '../actions/session_actions';

const Login = () => {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const handleInput = (event, field) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState[field] = event.target.value;
        setInputs(newState);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch( login(inputs) );
    };

    return(
        <form className="session-form">
            <div>
                <input
                id="username-input"
                type="text"
                value={inputs.username}
                onChange={e => handleInput(e, 'username')}
                autoComplete="true"
                required="true"
                ></input>
                <label htmlFor="username-input">Username</label>
            </div>
            <div>
                <input
                id="password-input"
                type="password"
                value={inputs.password}
                onChange={e => handleInput(e, 'password')}
                autoComplete="true"
                required="true"
                ></input>
                <label htmlFor="password-input">Password</label>
            </div>
            <button onClick={e => handleLogin(e)}>Log In</button>
        </form>
    );
};

export default Login;