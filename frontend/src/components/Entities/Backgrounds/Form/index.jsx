import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, TextArea } from '../../../../styles/components';
import { handleInput } from '../../../../util/functions/utilFunctions';
import entityTypes from '../../../../util/types/entityTypes';
import ModalFooter from '../../../Modal/ModalFooter';
import { FormContainer, Field, Label } from '../../styles';
import EntityAutocomplete from '../../EntityAutocomplete';
import { createBackground, editBackground } from '../../../../store/reducers/entities/backgroundsReducer';
import { merge } from 'lodash';


export default function BackgroundForm({background=null, edit=false}) {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        features: []
    });

    const [featureInput, setFeatureInput] = useState("");

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    useEffect( () => {
        if (edit) {
            setInputs(background);
        }
    }, []);

    const bgFeatures = inputs.features.map( (id) => {
        const feature = features[id];
        return(
            <li>
                <p>{feature.name}</p>
                <button onClick={() => handleRemoveFeauture(id)}>X</button>
            </li>
        )
    })

    const handleSave = () => {
        const action = {
            type: edit ? editBackground.type: createBackground.type,
            payload: {
                id: background?._id,
                formData: inputs
            }
        };
        dispatch(action);
    }

    const handleSelectFeature = (feature) => {
        const newState = merge({}, inputs);
        if (!newState.features.includes(feature._id)) {
            newState.features.push(feature._id);
        }
        setInputs(newState);
    }

    const handleRemoveFeauture = (id) => {
        const newState = merge({}, inputs);
        newState.features = newState.features.filter( (featureId) => featureId !== id)
        setInputs(newState);
    }

    return(
        <FormContainer className="w-[60rem] h-2/3">
            <div className="p-6 grid grid-cols-4 h-[calc(100%-3rem)] gap-x-4">
                <Field className="col-span-2">
                    <Label>Name </Label>
                    <Input
                        type="text"
                        value={inputs.name}
                        onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    ></Input>
                </Field>
                <Field className="flex flex-col col-span-4 row-span-6">
                    <Label>Description </Label>
                    <TextArea
                        type="text"
                        value={inputs.description}
                        onChange={e => handleInput(e, 'description', inputs, setInputs)}
                        className="h-full"
                    ></TextArea>
                </Field>
                <Field>
                    <Label>Add Feature</Label>
                    <EntityAutocomplete
                        entityType={entityTypes.FEATURES}
                        input={featureInput}
                        handleInput={e => setFeatureInput(e.target.value)}
                        handleSelect={(feature) => handleSelectFeature(feature)}
                    />
                </Field>
                <ul>
                    {bgFeatures}
                </ul>
            </div>
            <ModalFooter
                handleSave={() => handleSave()}
            />
        </FormContainer>
    )
}