import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { panelContentClasses } from '../styles';
import { handleInput } from '../../../util/functions/utilFunctions';
import { Button, ClearInput, Input, Label, TextArea } from '../../../styles/components';
import ClassFormTable from './ClassFormTable';
import { merge } from 'lodash';
import Select from '../../Util/Select';

const dieOptions = ["1d6", "1d8", "1d10", "1d12"];

export default function ClassFormPanel({dndClass, styleData, preloadedInputs=null, inputs, setInputs}) {

    useEffect( () => {
        if (preloadedInputs) {
            setInputs(preloadedInputs);
        }
    }, []);

    const [gearInput, setGearInput] = useState("");
    const [addingGear, setAddingGear] = useState(false);

    const saveGearLine = (event) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.equipment.push(gearInput);
        setInputs(newState);
        setGearInput("");
        setAddingGear(false);
    }

    
    return(
        <div style={styleData} className={panelContentClasses}>
            <div>
                <Label>Name: </Label>
                <ClearInput
                    type="text"
                    value={inputs.name}
                    onChange={e => handleInput(e, 'name', inputs, setInputs)}
                ></ClearInput>
                <Label>Hit Die: </Label>
                <Select optionList={dieOptions} field={'hitDie'} state={inputs} setState={setInputs} />
            </div>
            <div className="flex flex-col">
                <div>
                    <Label>Armor: </Label>
                    <ClearInput
                        type="text"
                        value={inputs.armor}
                        onChange={e => handleInput(e, 'armor', inputs, setInputs)}
                    ></ClearInput>
                </div>
                <div>
                    <Label>Weapons: </Label>
                    <ClearInput
                        type="text"
                        value={inputs.weapons}
                        onChange={e => handleInput(e, 'weapons', inputs, setInputs)}
                    ></ClearInput>
                </div>
                <div>
                    <Label>Tools: </Label>
                    <ClearInput
                        type="text"
                        value={inputs.tools}
                        onChange={e => handleInput(e, 'tools', inputs, setInputs)}
                    ></ClearInput>
                </div>
                <div>
                    <Label>Saving Throws: </Label>
                    <ClearInput
                        type="text"
                        value={inputs.saves}
                        onChange={e => handleInput(e, 'saves', inputs, setInputs)}
                    ></ClearInput>
                </div>
                <div>
                    <Label>Skills: </Label>
                    <ClearInput
                        type="text"
                        value={inputs.skills}
                        onChange={e => handleInput(e, 'skills', inputs, setInputs)}
                    ></ClearInput>
                </div>
            </div>
            <div>
                    <Label>Equipment: </Label>
                    <div className="ml-8">
                    <ul className="list-disc">
                        {inputs.equipment.map( (line, i) => {
                            return <li key={i}>{line}</li>
                        })}
                    </ul>
                    </div>
                    {addingGear ? 
                        <>
                        <ClearInput
                            type="text"
                            value={gearInput}
                            onChange={e => setGearInput(e.target.value)}
                        ></ClearInput>
                        <Button onClick={(e) => saveGearLine(e)}>Save Line</Button>
                        </>
                    :
                        <Button onClick={() => setAddingGear(true)}>Add Line</Button>
                    }
            </div>
            <Label>Description: </Label>
            <TextArea
                className="mb-2"
                value={inputs.description}
                onChange={e => handleInput(e, 'description', inputs, setInputs)}
            ></TextArea>
            <ClassFormTable dndClass={dndClass} inputs={inputs} setInputs={setInputs}/>
        </div>
    )
}