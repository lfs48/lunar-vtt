import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { BgButton, Header, Input, TextButton } from '../../styles/components';
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
            <div className="flex flex-col w-96">
                <Input
                    type="text"
                    value={inputs.username}
                    onChange={e => handleInput(e, 'username', inputs, setInputs)}
                    className="mb-4"
                ></Input>
                <Input
                    type="password"
                    value={inputs.password}
                    onChange={e => handleInput(e, 'password', inputs, setInputs)}
                    className="mb-4"
                ></Input>
                <Input
                    type="password"
                    value={inputs.password2}
                    onChange={e => handleInput(e, 'password2', inputs, setInputs)}
                    className="mb-4"
                ></Input>
                <BgButton onClick={e => handleRegister(e)}>Register</BgButton>
                <TextButton onClick={() => history.push("/")}>Have an Account? Log In</TextButton>
            </div>
        </div>
        </>
    )
}