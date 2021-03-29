import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Panel from '../Panel/Panel';
import Sidebar from '../Sidebar/Sidebar';

export default function Dashboard() {

    const {classes} = useSelector( (state) => ({
        classes: Object.values(state.entities.dndClasses).filter( (dndClass) => state.UI.panels.dndClass.includes(dndClass.id) )
    }));
    const classPanels = classes.map( (dndClass) => {
        return <Panel data={dndClass} panelType="dndClass"/>
    })

    return(
        <div className="overflow-hidden">
            {classPanels}
            <Sidebar />
        </div>
    )
}