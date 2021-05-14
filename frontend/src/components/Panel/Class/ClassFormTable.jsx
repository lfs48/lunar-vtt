import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { BgButton, Input } from '../../../styles/components';
import { getLevelProf, intToOrdinal } from '../../../util/functions/utilFunctions';
import entityTypes from '../../../util/types/entityTypes';
import PanelLink from '../PanelLink';

export default function ClassFormTable({dndClass}) {

    const [addingCol, setAddingCol] = useState(false);

    const extraHeaders = Object.keys(dndClass.tableCols).map( (col, i) => {
        return <ClassTableHeader key={i}>{col}</ClassTableHeader>
    });

    return(
        <table className="w-full mb-6">
            <thead className="border-b-2 border-black">
                <tr>
                    <ClassTableHeader>Level</ClassTableHeader>
                    <ClassTableHeader>Features</ClassTableHeader>
                    {extraHeaders}
                    <ClassTableHeader>
                        {addingCol ?
                            <>
                            <Input
                                type="text"
                                className="w-32 h-8"
                            ></Input>
                            <BgButton 
                                className="bg-gray-200 h-8"
                                onClick={() => setAddingCol(false)}
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
                    </ClassTableHeader>
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