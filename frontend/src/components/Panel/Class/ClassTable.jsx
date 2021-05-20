import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';
import { getLevelProf, getSpellSlots, intToOrdinal } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import PanelLink from '../PanelLink';
import { ClassTableHeaderCenter, ClassTableHeaderLeft, ClassTableRowCenter, ClassTableRowLeft } from './styles';

export default function ClassTable({dndClass, features}) {

    const extraHeaders = Object.keys(dndClass.tableCols).map( (col, i) => {
        return <ClassTableHeaderCenter key={i} className="text-center">{col}</ClassTableHeaderCenter>
    });
    let spellHeaders = <></>;
    if (dndClass.spellcasting && dndClass.spellcasting !== "None") {
        spellHeaders = getSpellSlots(dndClass.spellcasting)[1].map( (_, i) => {
            return <ClassTableHeaderCenter key={i}>{intToOrdinal(i+1)}</ClassTableHeaderCenter>
        });
    }

    const trows = [...Array(20).keys()].map( (n) => {
        const level = n+1;
        const levelFeatures = dndClass.features[level]
        .map( (id) => {
            const feature = features.find(feat => feat._id === id);
            return <PanelLink key={id} panelType={entityTypes.FEATURES} id={id} text={feature.name}/>
        });
        const extraCols = Object.keys(dndClass.tableCols).map( (col, i) => {
            return <ClassTableRowCenter key={i}>{dndClass.tableCols[col][n]}</ClassTableRowCenter>
        });
        let spellCols = <></>;
        if (dndClass.spellcasting && dndClass.spellcasting !== "None") {
            const levelSlots = getSpellSlots(dndClass.spellcasting)[n];
            spellCols = levelSlots.map( (slots, i) => {
                return <ClassTableRowCenter key={i}>{slots > 0 ? slots : "—"}</ClassTableRowCenter>
            })
        }
        if (dndClass)
        return(
            <tr key={n} className="border-b border-gray-400">
                <ClassTableRowLeft>{intToOrdinal(level)}</ClassTableRowLeft>
                <ClassTableRowCenter>{`+ ${getLevelProf(level)}`}</ClassTableRowCenter>
                <ClassTableRowLeft>{levelFeatures}</ClassTableRowLeft>
                {extraCols}
                {spellCols}
            </tr>
        )
    });

    return(
        <table className="w-full mb-6">
            <thead className="border-b-2 border-black">
                <tr>
                    <ClassTableHeaderLeft>Level</ClassTableHeaderLeft>
                    <ClassTableHeaderCenter>Prof</ClassTableHeaderCenter>
                    <ClassTableHeaderLeft>Features</ClassTableHeaderLeft>
                    {extraHeaders}
                    {spellHeaders}
                </tr>
            </thead>
            <tbody>
                {trows}
            </tbody>
        </table>
    )
}