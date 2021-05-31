import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ClearInput, Label, TextArea } from '../../../styles/components';
import { handleInput, intToOrdinal } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import EntityAutocomplete from '../../EntityAutocomplete/EntityAutocomplete';
import { panelContentClasses } from '../styles';
import { merge } from 'lodash';
import EntityLink from '../EntityLink';


export default function EditSubclassPanel({inputs, setInputs, styleData}) {

    const [featureInputs, setFeatureInputs] = useState({
        name: "",
        id: "",
        level: ""
    });

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    const subclassFeatures =
    Object.entries(inputs.features)
    .map( ([level, arr]) => {
        return(
            <div>
                <h1>{intToOrdinal(level)} level features:</h1>
                {arr.map( (id) => {
                    return <EntityLink panelType={entityTypes.FEATURES} id={id}>
                        {features[id].name}
                    </EntityLink>
                })}
            </div>
        )
    });

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
    }

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
                    <Label>Description: </Label>
                    <TextArea
                        type="text"
                        value={inputs.description}
                        onChange={e => handleInput(e, 'description', inputs, setInputs)}
                    ></TextArea>
                </div>
                <div>
                    {subclassFeatures}
                </div>
                <div>
                    <EntityAutocomplete 
                        entityType={entityTypes.FEATURES}
                        input={featureInputs.name}
                        handleInput={e => handleInput(e, 'name', featureInputs, setFeatureInputs)}
                        handleSelect={feature => handleFeatureSelect(feature)}
                    />
                    <ClearInput
                        type="text"
                        value={featureInputs.level}
                        onChange={e => handleInput(e, 'level', featureInputs, setFeatureInputs)}
                    ></ClearInput>
                    <Button
                        onClick={() => handleAddFeature()}
                    >
                        Add Feature
                    </Button>
                </div>
            </div>
        </div>
    )
}