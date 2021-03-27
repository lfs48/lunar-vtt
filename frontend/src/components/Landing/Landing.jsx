import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { userLoginRequested } from '../../store/reducers/session/sessionReducer';
import { BgButton1, Header, Input, Label, TextButton1 } from '../../styles/components';
import { handleInput } from '../../util/functions/utilFunctions';

export default function Landing() {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const handleLogin = (event) => {
        event.preventDefault();
        const action = {
            type: userLoginRequested.type,
            payload: inputs
        };
        dispatch(action);
    };

    return(
        <>
        <div className="flex h-full flex-col justify-center items-center">
            <Header className="mb-6">Log In</Header>
            <div className="flex flex-col w-72">
                <Label className="mb-1">Username</Label>
                <Input
                    type="text"
                    value={inputs.username}
                    onChange={e => handleInput(e, 'username', inputs, setInputs)}
                    className="mb-4"
                ></Input>
                <Label className="mb-1">Password</Label>
                <Input
                    type="password"
                    value={inputs.password}
                    onChange={e => handleInput(e, 'password', inputs, setInputs)}
                    className="mb-6"
                ></Input>
                <BgButton1 className="mb-4" onClick={e => handleLogin(e)}>Log In</BgButton1>
                <TextButton1 onClick={() => history.push("/register")}>New User? Sign Up</TextButton1>
            </div>
        </div>
        </>
    )
}