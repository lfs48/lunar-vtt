import React, { useState } from 'react';
import { Button, Label } from '../../../../styles/components';
import { merge } from 'lodash';
import EntityAutocomplete from '../../EntityAutocomplete';
import { sourceModelToEntityType } from '../../../../util/types/entityTypes';
import { handleInput } from '../../../../util/functions/utilFunctions';
import { useSelector } from 'react-redux';

export default function SourceSection({inputs, setInputs}) {

    const [sourceInput, setSourceInput] = useState({
        name: "",
        id: "",
        level: ""
    });
    const [addingSource, setAddingSource] = useState(false);

    const entityType = sourceModelToEntityType(inputs.sourceModel);

    const {entities} = useSelector( (state) => ({
        entities: state.entities[entityType]
    }));

    const saveSource = (event) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        if (!newState.sources.includes(sourceInput.id)) {
            newState.sources.push(sourceInput.id);
        }
        setInputs(newState);
        setSourceInput({
            name: "",
            id: ""
        });
        setAddingSource(false);
    };

    const cancelAddingSource = (event) => {
        event.preventDefault();
        setSourceInput({
            name: "",
            id: ""
        });
        setAddingSource(false);
    }

    const removeSource = (index) => {
        const newState = merge({}, inputs);
        newState.sources = newState.sources.filter( (_, i) => i !== index);
        setInputs(newState);
    }

    const handleSelectSource = (source) => {
        setSourceInput({
            name: source.name,
            id: source._id
        });
    }

    return(
        <div className="flex flex-col col-span-2 row-span-4">
            <Label>Sources </Label>
            <div className="ml-8">
                {inputs.sources.length > 0 ?
                    <ul className="list-disc divide-y-[1px]">
                        {inputs.sources.map( (id, i) => {
                            const source = entities[id];
                            return (
                                <li className="w-full py-0.5" key={i}>
                                    <div className="w-full flex justify-between">
                                        <span>{source.name}</span>
                                        <Button onClick={() => removeSource(i)}>
                                            <i className="text-red-500 fas fa-times"></i>
                                        </Button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                :
                    <p>None</p>
                }
                {addingSource ? 
                    <div className="flex items-center">
                        <EntityAutocomplete
                            entityType={entityType}
                            input={sourceInput.name}
                            handleInput={e => handleInput(e, 'name', sourceInput, setSourceInput)}
                            handleSelect={(source) => handleSelectSource(source)}
                            className="w-full"
                        ></EntityAutocomplete>
                        <div className="flex flex-col">
                            <Button onClick={(e) => saveSource(e)}>
                                <i className=" text-green-300 fas fa-check"></i>
                            </Button>
                            <Button onClick={(e) => cancelAddingSource(e)}>
                                <i className="text-red-500 fas fa-times"></i>
                            </Button>
                        </div>
                    </div>
                :
                    <Button onClick={() => setAddingSource(true)}>Add Source</Button>
                }
            </div>
        </div>
    )
}