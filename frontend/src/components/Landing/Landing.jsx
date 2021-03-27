import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Header, Input, TextButton } from '../../styles/components';
import { apiLogin} from '../../util/api/apiAuthUtil'
import { handleInput } from '../../util/functions/utilFunctions';

export default function Landing() {
    
    const history = useHistory();

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const handleLogin = (event) => {
        event.preventDefault();
        apiLogin(inputs);
    }

    return(
        <>
        <div className="flex h-full flex-col justify-center items-center">
            <Header className="mb-6">Lunar VTT</Header>
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
                <Button onClick={e => handleLogin(e)}>Log In</Button>
                <TextButton onClick={() => history.push("/register")}>New User? Sign Up</TextButton>
            </div>
        </div>
        </>
    )
}