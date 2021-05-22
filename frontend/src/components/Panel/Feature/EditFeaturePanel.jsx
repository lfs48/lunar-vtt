import React, { useEffect } from 'react';
import { panelContentClasses } from '../styles';
import { ClearInput, Label, TextArea } from '../../../styles/components';
import { handleInput } from '../../../util/functions/utilFunctions';
import Select from '../../Util/Select';

const featureTypeOptions = ['Action', 'Bonus Action', 'Reaction', 'Passive', 'Triggered', 'Other'];
const sourceTypeOptions = ['DndClass', 'Subclass', 'Race', 'Background', 'Feat'];

export default function FeatureForm({inputs, setInputs, preloadedInputs, styleData}) {

    useEffect( () => {
        setInputs(preloadedInputs);
    }, []);

    return(
        <div style={styleData} className={panelContentClasses}>
            <div className="flex flex-col">
                <div>
                    <Label>Name: </Label>
                    <ClearInput
                        type="text"
                        value={inputs.name}
                        onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    ></ClearInput>
                </div>
                <div>
                    <Label>Type: </Label>
                    <Select 
                        optionList={featureTypeOptions}
                        field={'featureType'}
                        state={inputs}
                        setState={setInputs}
                    />
                </div>
                <div>
                    <Label>Source Type: </Label>
                    <Select 
                        optionList={sourceTypeOptions}
                        field={'sourceModel'}
                        state={inputs}
                        setState={setInputs}
                    />
                </div>
                <div>
                    <Label>Description: </Label>
                    <TextArea
                        type="text"
                        value={inputs.description}
                        onChange={e => handleInput(e, 'description', inputs, setInputs)}
                    ></TextArea>
                </div>
            </div>
        </div>
    )
}