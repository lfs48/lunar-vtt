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
        <form>
            <input
                type="text"
                value={inputs.username}
                onChange={e => handleInput(e, 'username')}
            ></input>
            <input
                type="password"
                value={inputs.password}
                onChange={e => handleInput(e, 'password')}
            ></input>
            <input
                type="password"
                value={inputs.password2}
                onChange={e => handleInput(e, 'password2')}
            ></input>
            <button onClick={e => handleSignup(e)}>Sign Up</button>
        </form>
    );
};

export default Register;