import React, { useEffect, useState } from 'react';
import { BgButton, Button, ClearInput, Input } from '../../../styles/components';
import { getLevelProf, handleInput, intToOrdinal } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import PanelLink from '../PanelLink';
import { merge } from 'lodash';
import { useSelector } from 'react-redux';
import { ClassTableHeaderCenter, ClassTableHeaderLeft, ClassTableRowCenter, ClassTableRowLeft } from './styles';
import tw from 'tailwind-styled-components';
import FeatureAutocomplete from '../../FeatureAutocomplete/FeatureAutocomplete';

export default function ClassFormTable({inputs, setInputs}) {

    const [addingCol, setAddingCol] = useState(false);
    const [colInput, setColInput] = useState("");

    const [addingFeature, setAddingFeature] = useState(false);
    const [featureInput, setFeatureInput] = useState({
        name: "",
        id: ""
    });

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    let classFeatures = [];
    Object.entries(inputs.features).forEach( ([key, arr]) => {
        arr.forEach( (id) => {
            const feature = features[id];
            classFeatures.push(feature);
        })
    });;

    const extraHeaders = Object.keys(inputs.tableCols).map( (col, i) => {
        return <ClassTableHeaderCenter key={i}>{col}</ClassTableHeaderCenter>
    });

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
        const levelFeatures = newState.features[level];
        if ( levelFeatures.findIndex( feature => feature._id === featureInput.id) === -1) {
            newState.features[level].push(featureInput.id);
        }
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

    const trows = [...Array(20).keys()].map( (n) => {
        const level = n+1;
        const levelFeatures = inputs.features[level]
        .map( (id) => {
            const feature = classFeatures.find(feat => feat._id === id);
            return <PanelLink key={id} panelType={entityTypes.FEATURES} id={id} text={feature.name}/>
        });    
        const extraCols = Object.keys(inputs.tableCols).map( (col, i) => {
            return (
                <ClassTableRowCenter key={i} className="">
                    <TableInput
                        type="text"
                        value={inputs.tableCols[col][n]}
                        onChange={(e) => handleRowInput(e, col, n)}
                        className="text-center"
                    ></TableInput>
                </ClassTableRowCenter>
            )
        });
        return(
            <tr key={n} className="border-b border-gray-400">
                <ClassTableRowLeft>{intToOrdinal(level)}</ClassTableRowLeft>
                <ClassTableRowCenter>{`+ ${getLevelProf(level)}`}</ClassTableRowCenter>
                <ClassTableRowLeft>
                    {levelFeatures}
                    {(addingFeature === level) ?
                        <>
                        <FeatureAutocomplete
                            className="bg-none w-48 border border-black rounded px-2 py-0.5 text-sm"
                            input={featureInput.name}
                            handleInput={(e) => handleInput(e, 'name', featureInput, setFeatureInput)}
                            handleSelect={(feature) => handleSelectFeature(feature)}
                        >

                        </FeatureAutocomplete>
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
                            +
                        </BgButton>
                    }
                </ClassTableRowLeft>
                {extraCols}
            </tr>
        )
    });

    const handleRowInput = (event, col, index) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.tableCols[col][index] = event.target.value;
        setInputs(newState);
    };

    const addCol = () => {
        const newState = merge({}, inputs);
        const newCols = merge({}, newState.tableCols);
        newCols[colInput] = [...Array(20).keys()];
        newState.tableCols = newCols;
        setInputs(newState);
        setAddingCol(false);
    };

    return(
        <table className="w-full mb-6">
            <thead className="border-b-2 border-black">
                <tr>
                    <ClassTableHeaderLeft>Level</ClassTableHeaderLeft>
                    <ClassTableHeaderCenter>Prof</ClassTableHeaderCenter>
                    <ClassTableHeaderLeft>Features</ClassTableHeaderLeft>
                    {extraHeaders}
                    <ClassTableHeaderCenter>
                        {addingCol ?
                            <>
                            <Input
                                type="text"
                                className="w-32 h-8"
                                value={colInput}
                                onChange={(e) => setColInput(e.target.value)}
                            ></Input>
                            <BgButton 
                                className="bg-gray-200 h-8"
                                onClick={() => addCol()}
                            >Save</BgButton>
                            </>
                        :
                            <Button 
                                className="text-blue-500"
                                onClick={() => setAddingCol(true)}
                            >
                                Add Col
                            </Button>
                        }
                    </ClassTableHeaderCenter>
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