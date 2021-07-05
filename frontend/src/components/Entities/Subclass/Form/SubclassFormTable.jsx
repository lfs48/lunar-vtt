import React, { useEffect, useState } from 'react';
import { BgButton, Button, ClearInput, DropDown, Input } from '../../../../styles/components';
import { getLevelProf, handleInput, intToOrdinal } from '../../../../util/functions/utilFunctions';
import entityTypes from '../../../../util/types/entityTypes';
import { merge } from 'lodash';
import { useSelector, useStore } from 'react-redux';
import { ClassTableHeaderCenter, ClassTableHeaderLeft, ClassTableRowCenter, ClassTableRowLeft } from '../styles';
import tw from 'tailwind-styled-components';
import EntityAutocomplete from '../../EntityAutocomplete';

export default function SubclassFormTable({inputs, setInputs, levels}) {

    const [addingFeature, setAddingFeature] = useState(false);
    const [featureInput, setFeatureInput] = useState({
        name: "",
        id: ""
    });

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    const handleAddingFeature = (event, level) => {
        event.preventDefault();
        setAddingFeature(level);
        setFeatureInput({
            name: "",
            id: ""
        });
    }

    const cancelAddingFeature = (event) => {
        event.preventDefault();
        setAddingFeature(false);
        setFeatureInput({
            name: "",
            id: ""
        });
    }

    const addFeature = (event, level) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        const levelFeature = {
            level: level,
            feature: featureInput.id
        };
        newState.levelFeatures.push(levelFeature);
        setInputs(newState);
        setAddingFeature(false);
        setFeatureInput({
            name: "",
            id: ""
        });
    }

    const handleSelectFeature = (feature) => {
        setFeatureInput({
            name: feature.name,
            id: feature._id
        });
    }

    const handleRemoveFeature = (event, id, level) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.features[level] = newState.features[level].filter( _id => _id !== id);
        setInputs(newState);
    }

    const trows = levels.map( (level) => {
        const levelFeatures = inputs.levelFeatures
        .filter( (levelFeature => levelFeature.level === level))
        .map( (levelFeature) => {
            const id = levelFeature.feature
            const feature = features[id];
            return (
                <FeatureBubble key={id}>
                    <FeatureText>{feature.name}</FeatureText>
                    <RemoveFeatureButton onClick={(e) => handleRemoveFeature(e, id, level)}>
                        <i className="fas fa-times"></i>
                    </RemoveFeatureButton>
                </FeatureBubble>
            )
        });    
        return(
            <tr key={level} className="border-b border-gray-400">
                <ClassTableRowLeft>{intToOrdinal(level)}</ClassTableRowLeft>
                <ClassTableRowCenter>{`+ ${getLevelProf(level)}`}</ClassTableRowCenter>
                <ClassTableRowLeft>
                    <div className="flex">
                    {levelFeatures}
                    {(addingFeature === level) ?
                        <>
                        <EntityAutocomplete
                            className="bg-none w-48 border border-black rounded px-2 py-0.5 text-sm"
                            entityType={entityTypes.FEATURES}
                            input={featureInput.name}
                            handleInput={(e) => handleInput(e, 'name', featureInput, setFeatureInput)}
                            handleSelect={(feature) => handleSelectFeature(feature)}
                        >

                        </EntityAutocomplete>
                        <Button 
                            className="text-red-500 mx-2"
                            onClick={e => cancelAddingFeature(e)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="text-blue-500"
                            onClick={e => addFeature(e, level)}
                        >
                            Add
                        </Button>
                        </>
                    :
                        <BgButton 
                            className="bg-gray-300 rounded py-0 px-2"
                            onClick={(e) => handleAddingFeature(e, level)}
                        >
                            <i className="fas fa-plus"></i>
                        </BgButton>
                    }
                    </div>
                </ClassTableRowLeft>
            </tr>
        )
    });

    const handleRowInput = (event, col, index) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.tableCols[col][index] = event.target.value;
        setInputs(newState);
    };

    return(
        <table className="w-full mb-6">
            <thead className="border-b-2 border-black">
                <tr>
                    <ClassTableHeaderLeft>Level</ClassTableHeaderLeft>
                    <ClassTableHeaderLeft>Features</ClassTableHeaderLeft>
                </tr>
            </thead>
            <tbody>
                {trows}
            </tbody>
        </table>
    )
}

const TableInput = tw.input`
    bg-none
    w-24
    border
    border-black
    rounded
    px-2
    py-0.5
    text-sm
`;

const FeatureBubble = tw.div`
    flex
    items-center
    bg-gray-300
    rounded
    px-2
    mr-2
`

const FeatureText = tw.span`
    font-bold
    mr-2
`

const RemoveFeatureButton = tw(Button)`
    text-sm
    text-red-500
`

const ColMenuButton = tw(Button)`
    hover:bg-gray-300
    border-b
    border-gray-300
    last:border-none
`

