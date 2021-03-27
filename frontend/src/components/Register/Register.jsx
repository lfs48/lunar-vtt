import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { BgButton, BgButton1, Header, Input, Label, TextButton1 } from '../../styles/components';
import { apiRegister } from '../../util/api/apiAuthUtil'
import { handleInput } from '../../util/functions/utilFunctions';

export default function Register() {
    
    const history = useHistory();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        password2: ""
    });

    const handleRegister = (event) => {
        event.preventDefault();
        apiRegister(inputs);
    }

    return(
        <>
        <div className="flex h-full flex-col justify-center items-center">
            <Header className="mb-6">Create Account</Header>
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
                    className="mb-4"
                ></Input>
                <Label className="mb-1">Confirm Password</Label>
                <Input
                    type="password"
                    value={inputs.password2}
                    onChange={e => handleInput(e, 'password2', inputs, setInputs)}
                    className="mb-6"
                ></Input>
                <BgButton1 className="mb-4" onClick={e => handleRegister(e)}>Register</BgButton1>
                <TextButton1 onClick={() => history.push("/")}>Have an Account? Log In</TextButton1>
            </div>
        </div>
        </>
    )
}