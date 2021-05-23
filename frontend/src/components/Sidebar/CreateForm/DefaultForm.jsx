import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../../../styles/components';
import { handleInput } from '../../../util/functions/utilFunctions';
import { CreateFormWrapper } from './CreateFormWrapper';

export function DefaultForm({actionType}) {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: ""
    });

    const form = (
        <Input
            type="text"
            value={inputs.name}
            onChange={e => handleInput(e, 'name', inputs, setInputs)}
            className=""
        ></Input>
    );

    const handleCreate = () => {
        const action = {
            type: actionType,
            payload: {
                formData: inputs
            }
        };
        dispatch(action);
        handleCancel();
    }

    const handleCancel = () => {
        setInputs({
            name: ""
        });
    }

    return(
        <CreateFormWrapper 
            form={form}
            handleCreate={() => handleCreate()}
            handleCancel={() => handleCancel()}
        />
    )
}