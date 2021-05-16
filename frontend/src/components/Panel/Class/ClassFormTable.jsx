import React, { useEffect, useState } from 'react';
import { BgButton, ClearInput, Input } from '../../../styles/components';
import { getLevelProf, handleInput, intToOrdinal } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import PanelLink from '../PanelLink';
import { merge } from 'lodash';
import { useSelector } from 'react-redux';
import { ClassTableHeaderCenter, ClassTableHeaderLeft, ClassTableRowCenter, ClassTableRowLeft } from './styles';

export default function ClassFormTable({inputs, setInputs}) {

    const [addingCol, setAddingCol] = useState(false);
    const [colInput, setColInput] = useState("");

    const extraHeaders = Object.keys(inputs.tableCols).map( (col, i) => {
        return <ClassTableHeaderCenter key={i}>{col}</ClassTableHeaderCenter>
    });

    const trows = [...Array(20).keys()].map( (n) => {
        const level = n+1;
        const extraCols = Object.keys(inputs.tableCols).map( (col, i) => {
            return (
                <ClassTableRowCenter key={i} className="">
                    <ClearInput
                        type="text"
                        value={inputs.tableCols[col][n]}
                        onChange={(e) => handleRowInput(e, col, n)}
                    ></ClearInput>
                </ClassTableRowCenter>
            )
        });
        return(
            <tr key={n} className="border-b border-gray-400">
                <ClassTableRowLeft>{intToOrdinal(level)}</ClassTableRowLeft>
                <ClassTableRowCenter>{`+ ${getLevelProf(level)}`}</ClassTableRowCenter>
                {extraCols}
            </tr>
        )
    });

    const handleRowInput = (event, col, index) => {
        event.preventDefault();
        const newState = merge({}, inputs);
        newState.tableCols[col][index] = event.target.value;
        setInputs(newState);
    }

    const addCol = () => {
        const newState = merge({}, inputs);
        const newCols = merge({}, newState.tableCols);
        newCols[colInput] = [...Array(20).keys()];
        newState.tableCols = newCols;
        setInputs(newState);
        setAddingCol(false);
    }

    return(
        <table className="w-full mb-6">
            <thead className="border-b-2 border-black">
                <tr>
                    <ClassTableHeaderLeft>Level</ClassTableHeaderLeft>
                    <ClassTableHeaderCenter>Prof</ClassTableHeaderCenter>
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
                            <BgButton 
                                className="bg-gray-200 w-8 h-8"
                                onClick={() => setAddingCol(true)}
                            >
                                +
                            </BgButton>
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