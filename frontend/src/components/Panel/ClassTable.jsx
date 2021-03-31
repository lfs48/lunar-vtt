import React, { useEffect } from 'react';
import { getLevelProf, intToOrdinal } from '../../util/functions/utilFunctions';

export default function ClassTable({dndClass, features}) {

    const trows = [...Array(20).keys()].map( (n) => {
        const level = n+1;
        const levelFeatures = [];
        dndClass.features[n].forEach( (id) => {
            const feature = features.find(feat => feat.id === id);
            levelFeatures.push(feature.name);
        });
        return(
            <tr key={n}>
                <td>{intToOrdinal(level)}</td>
                <td>{`+ ${getLevelProf(level)}`}</td>
                <td>{levelFeatures.join(", ")}</td>
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
                </tr>
            </thead>
            <tbody>
                {trows}
            </tbody>
        </table>
    )
}