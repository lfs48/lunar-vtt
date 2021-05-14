import React, { useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { getLevelProf, intToOrdinal } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import PanelLink from '../PanelLink';

export default function ClassTable({dndClass, features}) {

    const extraHeaders = Object.keys(dndClass.tableCols).map( (col, i) => {
        return <ClassTableHeader key={i} className="text-center">{col}</ClassTableHeader>
    });

    const trows = [...Array(20).keys()].map( (n) => {
        const level = n+1;
        const levelFeatures = dndClass.features[n].map( (id) => {
            const feature = features.find(feat => feat.id === id);
            return <PanelLink key={id} panelType={entityTypes.FEATURES} id={id} text={feature.name}/>
        });
        const extraCols = Object.keys(dndClass.tableCols).map( (col, i) => {
            return <ClassTableRow key={i} className="text-center">{dndClass.tableCols[col][n]}</ClassTableRow>
        })
        return(
            <tr key={n} className="border-b border-gray-400">
                <ClassTableRow>{intToOrdinal(level)}</ClassTableRow>
                <ClassTableRow>{`+ ${getLevelProf(level)}`}</ClassTableRow>
                <ClassTableRow>{levelFeatures}</ClassTableRow>
                {extraCols}
            </tr>
        )
    });

    return(
        <table className="w-full mb-6">
            <thead className="border-b-2 border-black">
                <tr>
                    <ClassTableHeader>Level</ClassTableHeader>
                    <ClassTableHeader>Prof</ClassTableHeader>
                    <ClassTableHeader>Features</ClassTableHeader>
                    {extraHeaders}
                </tr>
            </thead>
            <tbody>
                {trows}
            </tbody>
        </table>
    )
}

const ClassTableHeader = tw.th`
    text-left
    pl-4
`
const ClassTableRow = tw.td`
    pl-4
    py-1
`