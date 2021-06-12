import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BgButton, Button, ClearInput, Input, Label, TextArea } from '../../../../styles/components';
import { handleInput, intToOrdinal } from '../../../../util/functions/utilFunctions';
import entityTypes from '../../../../util/types/entityTypes';
import EntityAutocomplete from '../../EntityAutocomplete';
import { merge } from 'lodash';
import EntityLink from '../../EntityLink';
import ModalFooter from '../../../Modal/ModalFooter';
import { Field } from '../../styles';
import Select from '../../../Util/Select';
import { createSubclass, editSubclass } from '../../../../store/reducers/entities/subclassesReducer';

const spellcastingOptions = ["None", "Full", "Half", "HalfPlus", "Third"];

export default function SubclassForm({subclass=null, edit=false}) {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        className: "",
        dndClass: "",
        spellcasting: "None",
        features: {}
    });

    const [featureInputs, setFeatureInputs] = useState({
        name: "",
        id: "",
        level: ""
    });

    useEffect( () => {
        if (edit) {
            setInputs(subclass);
        }
    });

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    const subclassFeatures =
    Object.entries(inputs.features)
    .map( ([level, arr]) => {
        return(
            <div key={level}>
                <h1>{intToOrdinal(level)} level features:</h1>
                {arr.map( (id) => {
                    return <EntityLink key={id} panelType={entityTypes.FEATURES} id={id}>
                        {features[id].name}
                    </EntityLink>
                })}
            </div>
        )
    });

    const handleClassSelect = (dndClass) => {
        const newState = merge({}, inputs);
        newState.className = dndClass.name;
        newState.dndClass = dndClass._id;
        setInputs(newState);
    }

    const handleFeatureSelect = (feature) => {
        const newState = merge({}, featureInputs);
        newState.name = feature.name;
        newState.id = feature._id;
        setFeatureInputs(newState);
    };

    const handleAddFeature = () => {
        const newState = merge({}, inputs);
        if (! (featureInputs.level in newState.features) ) {
            newState.features[featureInputs.level] = [featureInputs.id];
        }
        else if (!newState.features[featureInputs.level].includes(featureInputs.id)) {
            newState.features[featureInputs.level].push(featureInputs.id);
        }
        console.log(newState);
        setInputs(newState);
        setFeatureInputs({
            name: "",
            id: "",
            level: ""
        });
    };

    const handleSave = () => {
        const action = {
            type: edit ? editSubclass.type: createSubclass.type,
            payload: {
                id: subclass?._id,
                formData: inputs
            }
        };
        dispatch(action);
    }

    return(
        <div className="w-2/3 h-5/6 bg-white relative">
            <div className="w-full h-full p-6">
                <div className="grid grid-cols-3 grid-rows-6 gap-x-4 mb-12">
                    <Field>
                        <Label>Name </Label>
                        <Input
                            type="text"
                            value={inputs.name}
                            onChange={e => handleInput(e, 'name', inputs, setInputs)}
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Class</Label>
                        <EntityAutocomplete 
                            entityType={entityTypes.CLASSES}
                            input={inputs.className}
                            handleInput={e => handleInput(e, 'className', inputs, setInputs)}
                            handleSelect={dndClass => handleClassSelect(dndClass)}
                            className="w-full"
                        />
                    </Field>
                    <Field>
                        <Label>Spellcasting </Label>
                        <Select 
                            optionList={spellcastingOptions} 
                            field={'spellcasting'} 
                            state={inputs} 
                            setState={setInputs}
                            className="w-20"
                        />
                    </Field>
                    <Field className="col-span-3 row-span-5">
                        <Label>Description </Label>
                        <TextArea
                            type="text"
                            value={inputs.description}
                            onChange={e => handleInput(e, 'description', inputs, setInputs)}
                            className="h-full"
                        ></TextArea>
                    </Field>
                </div>
                <div className="flex items-end mb-4">
                    <Field>
                        <Label>Feature</Label>
                        <EntityAutocomplete 
                            entityType={entityTypes.FEATURES}
                            input={featureInputs.name}
                            handleInput={e => handleInput(e, 'name', featureInputs, setFeatureInputs)}
                            handleSelect={feature => handleFeatureSelect(feature)}
                            className="w-80 mr-2"
                        />
                    </Field>
                    <Field>
                        <Label>Level</Label>
                        <Input
                            type="text"
                            value={featureInputs.level}
                            onChange={e => handleInput(e, 'level', featureInputs, setFeatureInputs)}
                            className="w-20 mr-8"
                        ></Input>
                    </Field>
                    <BgButton
                        disabled={featureInputs.id.length < 1 || featureInputs.level || 1}
                        className="bg-gray-200 h-8"
                        onClick={() => handleAddFeature()}
                    >
                        Add Feature
                    </BgButton>
                </div>
                <div className="col-span-1">
                        {subclassFeatures.length > 0 ?
                            subclassFeatures
                        :
                            <p>No features</p>
                        }
                </div>
            </div>
            <ModalFooter handleSave={handleSave}/>
        </div>
    )
}