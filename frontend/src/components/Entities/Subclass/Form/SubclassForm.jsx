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
import SubclassFormTable from './SubclassFormTable';

const spellcastingOptions = ["None", "Full", "Half", "HalfPlus", "Third"];

export default function SubclassForm({subclass=null, edit=false}) {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        className: "",
        dndClass: "",
        spellcasting: "None",
        levelFeatures: []
    });

    const {dndClass} = useSelector( (state) => ({
        features: state.entities.features,
        dndClass: state.entities.dndClasses[inputs.dndClass]
    }));

    useEffect( () => {
        if (edit) {
            setInputs({
                name: subclass.name,
                description: subclass.description,
                dndClass: subclass.dndClass,
                className: dndClass?.name || "",
                spellcasting: subclass.spellcasting,
                levelFeatures: subclass.levelFeatures
            });
        }
    }, []);

    

    const handleClassSelect = (dndClass) => {
        const newState = merge({}, inputs);
        newState.className = dndClass.name;
        newState.dndClass = dndClass._id;
        setInputs(newState);
    }

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
                {dndClass?
                    <SubclassFormTable inputs={inputs} setInputs={setInputs} levels={dndClass.subclassFeatureLevels}/>
                :<></>}
            </div>
            <ModalFooter handleSave={handleSave}/>
        </div>
    )
}