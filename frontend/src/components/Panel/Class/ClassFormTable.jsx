import React, { useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { getLevelProf, intToOrdinal } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import PanelLink from '../PanelLink';

export default function ClassTable({dndClass, features}) {

    return(
        <table className="w-full mb-6">
            <thead className="border-b-2 border-black">
                <tr>
                    <ClassTableHeader>Level</ClassTableHeader>
                    <ClassTableHeader>Prof</ClassTableHeader>
                    <ClassTableHeader>Features</ClassTableHeader>
                </tr>
            </thead>
            <tbody>
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