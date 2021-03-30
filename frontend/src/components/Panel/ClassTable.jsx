import React from 'react';
import { getLevelProf, intToOrdinal } from '../../util/functions/utilFunctions';

export default function ClassTable({dndClass, features}) {

    const trows = [...Array(20).keys()].map( (n) => {
        return(
            <tr>
                <td>{intToOrdinal(n+1)}</td>
                <td>{`+ ${getLevelProf(n + 1)}`}</td>
                <td>Placeholder</td>
            </tr>
        )
    })

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