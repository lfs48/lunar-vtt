import React, { useEffect, useState } from 'react';
import { BgButton, Button, ClearInput, DropDown, Input } from '../../../../styles/components';
import { getLevelProf, handleInput, intToOrdinal } from '../../../../util/functions/utilFunctions';
import entityTypes from '../../../../util/types/entityTypes';
import { merge } from 'lodash';
import { useSelector, useStore } from 'react-redux';
import { ClassTableHeaderCenter, ClassTableHeaderLeft, ClassTableRowCenter, ClassTableRowLeft } from '../styles';
import tw from 'tailwind-styled-components';
import EntityAutocomplete from '../../EntityAutocomplete';

export default function ClassFormTable({inputs, setInputs}) {

    const [colMenu, setColMenu] = useState(-1);

    const [addingFeature, setAddingFeature] = useState(false);
    const [featureInput, setFeatureInput] = useState({
        name: "",
        id: ""
    });
    const [renamingCol, setRenamingCol] = useState({
        input: "",
        col: ""
    });

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    useEffect( () => {
        if (colMenu !== -1) {

            function closeMenu() {
                setColMenu(-1);
            }

            window.addEventListener("click", closeMenu);
    
            return function cleanupMenuListener() {
                window.removeEventListener("click", closeMenu);
            }
        }
    }, [colMenu]);

    const handleColRightClick = (event, index) =>  {
        event.preventDefault();
        setColMenu(index);
    }

    const handleDeleteCol = (event, col) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        delete newState.tableCols[col];
        setInputs(newState);
    }

    const handleMoveColLeft = (event, index) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        const newCols = {};
        let temp;
        Object.keys(newState.tableCols).forEach( (col, i) => {
            if (i === index - 1) {
                temp = {
                    [col]: newState.tableCols[col]
                }
            } else if (i === index) {
                newCols[col] = newState.tableCols[col];
                Object.assign(newCols, temp);
            } else {
                newCols[col] = newState.tableCols[col];
            }
        });
        newState.tableCols = newCols;
        setInputs(newState);
    }

    const handleMoveColRight = (event, index) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        const newCols = {};
        let temp;
        Object.keys(newState.tableCols).forEach( (col, i) => {
            if (i === index) {
                temp = {
                    [col]: newState.tableCols[col]
                }
            } else if (i === index + 1) {
                newCols[col] = newState.tableCols[col];
                Object.assign(newCols, temp);
            } else {
                newCols[col] = newState.tableCols[col];
            }
        });
        newState.tableCols = newCols;
        setInputs(newState);
    };

    const handleRenameCol = (event, col) => {
        event.preventDefault();
        setRenamingCol({
            name: col,
            col: col
        });
    };

    const handleRenameSave = (col) => {
        if (! (renamingCol.name in inputs.tableCols) ) {
            const newState = merge({}, inputs);
            const newCols = newState.tableCols;
            delete Object.assign(newCols, {[renamingCol.name]: newCols[renamingCol.col] })[renamingCol.col];
            newState.tableCols = newCols;
            setInputs(newState);
        }
        handleRenameCancel();
    };

    const handleRenameCancel = () => {
        setRenamingCol({
            name: "",
            col: ""
        });
    };

    const extraHeaders = Object.keys(inputs.tableCols).map( (col, i) => {
        if (col === renamingCol.col) {
            return(
                <ClassTableHeaderCenter key={i}>
                    <div className="flex w-full relative">
                        <Input
                            value={renamingCol.name}
                            onChange={e => handleInput(e, 'name', renamingCol, setRenamingCol)}
                            className="mr-2 w-full pr-16"
                        >
                        </Input>
                        <div className="absolute right-6 h-full flex items-center">
                            <Button
                                onClick={() => handleRenameSave(col)}
                                className="mr-4"
                            >
                                <i className="fas fa-check text-green-300"></i>
                            </Button>
                            <Button
                                onClick={() => handleRenameCancel()}
                            >
                                <i className="fas fa-times text-red-500"></i>
                            </Button>
                        </div>
                    </div>
                </ClassTableHeaderCenter>
            )
        } else {
            return (
                <ClassTableHeaderCenter key={i}>
                    <Button
                        onContextMenu={e => handleColRightClick(e, i)}
                    >
                        {col}
                    </Button>
                    <DropDown 
                        open={colMenu === i}
                        className="bg-gray-200"
                    >
                        <div className="flex flex-col">
                            <ColMenuButton
                                onClick={e => handleMoveColLeft(e, i)}
                            >
                                Move Left
                            </ColMenuButton>
                            <ColMenuButton
                                onClick={e => handleMoveColRight(e, i)}
                            >
                                Move Right
                            </ColMenuButton>
                            <ColMenuButton
                                onClick={e => handleRenameCol(e, col)}
                            >
                                Rename
                            </ColMenuButton>
                            <ColMenuButton
                                onClick={e => handleDeleteCol(e, col)}
                                className="text-red-600"
                            >
                                Delete
                            </ColMenuButton>
                        </div>
                    </DropDown>
                </ClassTableHeaderCenter>
            )
        }
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

    const handleRemoveFeature = (event, id) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.levelFeatures = newState.levelFeatures.filter( ({feature}) => feature !== id);
        setInputs(newState);
    }

    const addSubclassFeatureLevel = (level) => {
        const newState = merge({}, inputs);
        newState.subclassFeatureLevels.push(level);
        setInputs(newState);
    }

    const removeSubclassFeatureLevel = (level) => {
        const newState = merge({}, inputs);
        newState.subclassFeatureLevels = newState.subclassFeatureLevels.filter(el => el !== level);
        setInputs(newState);
    }

    const trows = [...Array(20).keys()].map( (n) => {
        const level = n+1;
        const levelFeatures = inputs.levelFeatures
        .filter( (levelFeature => levelFeature.level === level))
        .map( (levelFeature) => {
            const id = levelFeature.feature
            const feature = features[id];
            return (
                <FeatureBubble key={id}>
                    <FeatureText>{feature.name}</FeatureText>
                    <RemoveFeatureButton onClick={(e) => handleRemoveFeature(e, id)}>
                        <i className="fas fa-times"></i>
                    </RemoveFeatureButton>
                </FeatureBubble>
            )
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
                <ClassTableRowCenter>
                    {inputs.subclassFeatureLevels.includes(level) ?
                        <Button
                            onClick={e => removeSubclassFeatureLevel(level)}
                        >
                            <i className="text-green-500 fas fa-check"></i>
                        </Button>
                    :
                        <Button
                            onClick={e => addSubclassFeatureLevel(level)}
                        >
                            <i className="text-yellow-500 fas fa-plus"></i>
                        </Button>
                    }
                </ClassTableRowCenter>
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

    return(
        <table className="w-full mb-6">
            <thead className="border-b-2 border-black">
                <tr>
                    <ClassTableHeaderLeft>Level</ClassTableHeaderLeft>
                    <ClassTableHeaderCenter>Prof</ClassTableHeaderCenter>
                    <ClassTableHeaderLeft>Features</ClassTableHeaderLeft>
                    <ClassTableHeaderCenter>Subclass Feature?</ClassTableHeaderCenter>
                    {extraHeaders}
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

