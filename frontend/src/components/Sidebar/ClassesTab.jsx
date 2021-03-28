import React from 'react';
import { useSelector } from 'react-redux';
import { SidebarLi } from './styles';

export default function ClassesTab() {

    const {dndClasses} = useSelector( (state) => ({
        dndClasses: state.entities.dndClasses
    }));

    const classLis = Object.values(dndClasses).map( (dndClass, i) => {
        return <SidebarLi key={i}>{dndClass.name}</SidebarLi>
    })

    return(
        <div>
            <ul>
                {classLis}
            </ul>
        </div>
    )
}