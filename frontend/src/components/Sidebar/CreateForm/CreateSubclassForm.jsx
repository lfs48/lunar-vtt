import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '../../../styles/components';
import { handleInput } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import EntityAutocomplete from '../../EntityAutocomplete/EntityAutocomplete';
import { CreateFormWrapper } from './CreateFormWrapper';
import { merge } from 'lodash';
import { createSubclass } from '../../../store/reducers/entities/subclassesReducer';

export function CreateSubclassForm({}) {

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
        <div className="flex items-center">
            <Input
                type="text"
                value={inputs.name}
                onChange={e => handleInput(e, 'name', inputs, setInputs)}
                className="w-1/2 h-8 mr-2"
            ></Input>
            <EntityAutocomplete 
                entityType={entityTypes.CLASSES}
                input={inputs.className}
                handleInput={(e) => handleInput(e, 'className', inputs, setInputs)}
                handleSelect={(dndClass) => handleSelect(dndClass)}
                className="w-1/2 h-8"
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
            name: "",
            className: "",
            dndClass: ""
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