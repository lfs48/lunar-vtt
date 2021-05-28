import React, { useState } from 'react';
import { Button, Input, Label, TextArea } from '../../../../styles/components';
import { merge } from 'lodash';

export default function EquipmentSection({inputs, setInputs}) {

    const [gearInput, setGearInput] = useState("");
    const [addingGear, setAddingGear] = useState(false);

    const saveGearLine = (event) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.equipment.push(gearInput);
        setInputs(newState);
        setGearInput("");
        setAddingGear(false);
    };

    const cancelGearLine = (event) => {
        event.preventDefault();
        setGearInput("");
        setAddingGear(false);
    }

    const removeLine = (index) => {
        const newState = merge({}, inputs);
        newState.equipment = newState.equipment.filter( (_, i) => i !== index);
        setInputs(newState);
    }

    return(
        <div className="flex flex-col col-span-2 row-span-4">
            <Label>Equipment </Label>
            <div className="ml-8">
                {inputs.equipment.length > 0 ?
                    <ul className="list-disc divide-y-[1px]">
                        {inputs.equipment.map( (line, i) => {
                            return (
                                <li className="w-full py-0.5" key={i}>
                                    <div className="w-full flex justify-between">
                                        <span>{line}</span>
                                        <Button onClick={() => removeLine(i)}>
                                            <i className="text-red-500 fas fa-times"></i>
                                        </Button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                :
                    <li>None</li>
                }
                {addingGear ? 
                    <div className="flex items-center">
                        <TextArea
                            type="text"
                            value={gearInput}
                            onChange={e => setGearInput(e.target.value)}
                            className="w-5/6 mr-2"
                        ></TextArea>
                        <div className="flex flex-col">
                            <Button onClick={(e) => saveGearLine(e)}>
                                <i className=" text-green-300 fas fa-check"></i>
                            </Button>
                            <Button onClick={(e) => cancelGearLine(e)}>
                                <i className="text-red-500 fas fa-times"></i>
                            </Button>
                        </div>
                    </div>
                :
                    <Button onClick={() => setAddingGear(true)}>Add Line</Button>
                }
            </div>
        </div>
    )
}