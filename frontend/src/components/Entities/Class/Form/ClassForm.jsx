import React, { useEffect, useState } from 'react';
import { handleInput } from '../../../../util/functions/utilFunctions';
import { Button, ClearInput, Input, Label, TextArea } from '../../../../styles/components';
import ClassFormTable from './ClassFormTable';
import { merge } from 'lodash';
import Select from '../../../Util/Select';
import ModalFooter from '../../../Modal/ModalFooter';
import tw from 'tailwind-styled-components';
import EquipmentSection from './EquipmentSection';
import { createClass, editClass } from '../../../../store/reducers/entities/classesReducer';
import { useDispatch } from 'react-redux';

const dieOptions = ["1d6", "1d8", "1d10", "1d12"];
const spellcastingOptions = ["None", "Full", "Half", "HalfPlus", "Third"];

function getInitialFeatures() {
    const initialFeatures = {};
    [...Array(20).keys()].forEach( (n) => {
        initialFeatures[(n+1).toString()] = []
    });
    return initialFeatures;
}

export default function ClassForm({dndClass=null, edit=false}) {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        hitDie: "1d8",
        saves: "",
        weapons: "",
        armor: "",
        skills: "",
        tools: "",
        spellcasting: "None",
        equipment: [],
        tableCols: {},
        features: getInitialFeatures()
    });

    useEffect( () => {
        if (edit) {
            setInputs(dndClass);
        }
    }, []);

    const handleSave = () => {
        const action = {
            type: edit ? editClass.type: createClass.type,
            payload: {
                id: dndClass?._id,
                formData: inputs
            }
        };
        dispatch(action);
    }
    
    return(
        <div className="relative bg-white w-2/3 h-5/6">
            <div className="flex flex-col bg-white w-full h-[calc(100%-3rem)] overflow-y-auto p-6">
                <div className="grid grid-cols-4 gap-x-12 gap-y-4 mb-12">
                    <Field>
                        <Label>Name </Label>
                        <Input
                            type="text"
                            value={inputs.name}
                            onChange={e => handleInput(e, 'name', inputs, setInputs)}
                            className=""
                        ></Input>
                    </Field>
                    <div className="flex">
                        <Field className="mr-8">
                            <Label>Hit Die </Label>
                            <Select 
                                optionList={dieOptions} 
                                field={'hitDie'} 
                                state={inputs} 
                                setState={setInputs} 
                                className="w-20"
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
                    </div>
                    <Field className="col-span-2 row-span-3">
                        <Label>Description </Label>
                        <TextArea
                            className="mb-2 w-full h-full"
                            value={inputs.description}
                            onChange={e => handleInput(e, 'description', inputs, setInputs)}
                        ></TextArea>
                    </Field>
                    <Field className="col-span-2">
                        <Label>Armor </Label>
                        <Input
                            type="text"
                            value={inputs.armor}
                            onChange={e => handleInput(e, 'armor', inputs, setInputs)}
                        ></Input>
                    </Field>
                    <Field className="col-span-2">
                        <Label>Weapons </Label>
                        <Input
                            type="text"
                            value={inputs.weapons}
                            onChange={e => handleInput(e, 'weapons', inputs, setInputs)}
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Tools </Label>
                        <Input
                            type="text"
                            value={inputs.tools}
                            onChange={e => handleInput(e, 'tools', inputs, setInputs)}
                        ></Input>
                    </Field>
                    <Field>
                        <Label>Saving Throws </Label>
                        <Input
                            type="text"
                            value={inputs.saves}
                            onChange={e => handleInput(e, 'saves', inputs, setInputs)}
                        ></Input>
                    </Field>
                    <EquipmentSection
                        inputs={inputs}
                        setInputs={setInputs}
                    />
                    <Field className="col-span-2">
                        <Label>Skills </Label>
                        <Input
                            type="text"
                            value={inputs.skills}
                            onChange={e => handleInput(e, 'skills', inputs, setInputs)}
                            className="h-full"
                        ></Input>
                    </Field>
                </div>
                <div className="flex flex-col">
                </div>
                <ClassFormTable dndClass={dndClass} inputs={inputs} setInputs={setInputs}/>
                </div>
            <ModalFooter 
                handleSave={() => handleSave()}
            />
        </div>
    )
}

const Field = tw.div`
    flex
    flex-col
`

const FormInput = tw(Input)`
    
`