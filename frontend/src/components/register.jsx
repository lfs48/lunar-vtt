import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {merge} from 'lodash';
import { signup } from '../actions/session_actions';

const Register = () => {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        password2: ""
    });

    const handleInput = (event, field) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState[field] = event.target.value;
        setInputs(newState);
    };

    const handleSignup = (event) => {
        event.preventDefault();
        dispatch( signup(inputs) );
    };

    return(
        <form className="session-form">
            <div>
                <input
                id="username-input"
                type="text"
                value={inputs.username}
                onChange={e => handleInput(e, 'username')}
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
                required="true"
                ></input>
                <label htmlFor="password-input">Password</label>
            </div>

            <div>
                <input
                id="password2-input"
                type="password"
                value={inputs.password2}
                onChange={e => handleInput(e, 'password2')}
                required="true"
                ></input>
                <label htmlFor="password2-input">Confirm Password</label>
            </div>

            <button onClick={e => handleSignup(e)}>Sign Up</button>
        </form>
    );
};

export default Register;