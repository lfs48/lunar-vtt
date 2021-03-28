import React from 'react';
import { useSelector } from 'react-redux';

export default function ClassesTab() {

    const {dndClasses} = useSelector( (state) => ({
        dndClasses: state.entities.dndClasses
    }));

    const classLis = Object.values(dndClasses).map( (dndClass, i) => {
        return <li key={i}>{dndClass.name}</li>
    })

    return(
        <div>
            <ul>
                {classLis}
            </ul>
        </div>
    )
}