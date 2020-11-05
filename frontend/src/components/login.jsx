import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {merge} from 'lodash';
import { login } from '../actions/session_actions';

const Login = () => {

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

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch( login(inputs) );
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
            <button onClick={e => handleLogin(e)}>Log In</button>
        </form>
    );
};

export default Login;