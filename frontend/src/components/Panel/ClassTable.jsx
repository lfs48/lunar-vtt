import React, { useEffect } from 'react';
import { getLevelProf, intToOrdinal } from '../../util/functions/utilFunctions';

export default function ClassTable({dndClass, features}) {

    const extraHeaders = dndClass.classTableCols.map( (col) => {
        return <th>{col.name}</th>
    });

    const trows = [...Array(20).keys()].map( (n) => {
        const level = n+1;
        const levelFeatures = [];
        dndClass.classTable[n].features.forEach( (id) => {
            const feature = features.find(feat => feat.id === id);
            levelFeatures.push(feature.name);
        });
        const extraCols = dndClass.classTableCols.map( (col) => {
            return <td>{dndClass.classTable[n][col.key]}</td>
        })
        return(
            <tr key={n}>
                <td>{intToOrdinal(level)}</td>
                <td>{`+ ${getLevelProf(level)}`}</td>
                <td>{levelFeatures.join(", ")}</td>
                {extraCols}
            </tr>
        )
    });

    return(
        <table>
            <thead>
                <tr>
                    <th>Level</th>
                    <th>Proficiency Bonus</th>
                    <th>Features</th>
                    {extraHeaders}
                </tr>
            </thead>
            <tbody>
                {trows}
            </tbody>
        </table>
    )
}