import React, {useState} from 'react';
import {merge} from 'lodash';

const Login = () => {

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
        </form>
    );
};

export default Login;