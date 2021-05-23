import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../../../styles/components';
import { handleInput } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import EntityAutocomplete from '../../EntityAutocomplete/EntityAutocomplete';
import { CreateFormWrapper } from './CreateFormWrapper';
import { merge } from 'lodash';
import { createSubclass } from '../../../store/reducers/entities/subclassesReducer';

export function CreateSubclassForm({actionType}) {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        className: "",
        dndClass: ""
    });

    const handleSelect = (dndClass) => {
        const newState = merge({}, inputs);
        newState.className = dndClass.name;
        newState.dndClass = dndClass._id;
        setInputs(newState);
    }

    const form = (
        <div>
            <Input
                type="text"
                value={inputs.name}
                onChange={e => handleInput(e, 'name', inputs, setInputs)}
                className=""
            ></Input>
            <EntityAutocomplete 
                entityType={entityTypes.CLASSES}
                input={inputs.className}
                handleInput={(e) => handleInput(e, 'className', inputs, setInputs)}
                handleSelect={(dndClass) => handleSelect(dndClass)}
            />
        </div>
    );

    const handleCreate = () => {
        const action = {
            type: createSubclass.type,
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