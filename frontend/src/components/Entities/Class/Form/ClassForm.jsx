import React, { useEffect, useState } from 'react';
import { handleInput } from '../../../../util/functions/utilFunctions';
import { BgButton, Button, ClearInput, Input, Label, TextArea } from '../../../../styles/components';
import ClassFormTable from './ClassFormTable';
import { merge } from 'lodash';
import Select from '../../../Util/Select';
import ModalFooter from '../../../Modal/ModalFooter';
import tw from 'tailwind-styled-components';
import EquipmentSection from './EquipmentSection';
import { createClass, editClass } from '../../../../store/reducers/entities/classesReducer';
import { useDispatch } from 'react-redux';
import { Field } from '../../styles';

const dieOptions = ["1d6", "1d8", "1d10", "1d12"];
const spellcastingOptions = ["None", "Full", "Half", "HalfPlus", "Third"];

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
        levelFeatures: []
    });
    const [colInput, setColInput] = useState("");

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

    const handleAddCol = () => {
        const newState = merge({}, inputs);
        if (! (colInput in newState.tableCols) ) {
            const newCols = merge({}, newState.tableCols);
            newCols[colInput] = [...Array(20)].map( _ => "");
            newState.tableCols = newCols;
        }
        setInputs(newState);
        setColInput("");
    }
    
    return(
        <div className="relative bg-white w-[60rem] h-5/6">
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
                <div className="w-full flex justify-end mb-4">
                    <Input
                        value={colInput}
                        onChange={e => setColInput(e.target.value)}
                        className="mr-4"
                    ></Input>
                    <BgButton
                        onClick={() => handleAddCol()}
                        className="bg-gray-200"
                    >   
                        Add Column
                    </BgButton>
                </div>
                <ClassFormTable dndClass={dndClass} inputs={inputs} setInputs={setInputs}/>
                </div>
            <ModalFooter 
                handleSave={() => handleSave()}
            />
        </div>
    )
}