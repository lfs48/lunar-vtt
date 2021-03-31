import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Panel from '../Panel/Panel';
import Sidebar from '../Sidebar/Sidebar';

export default function Dashboard() {

    const {classes, features} = useSelector( (state) => ({
        classes: Object.values(state.entities.dndClasses).filter( (dndClass) => state.UI.panels.dndClass.includes(dndClass.id) ),
        features: Object.values(state.entities.features).filter( (feature) => state.UI.panels.feature.includes(feature.id) )
    }));
    const classPanels = classes.map( (dndClass) => {
        return <Panel key={dndClass.id} data={dndClass} panelType="dndClass"/>
    });
    const featurePanels = features.map( (feature) => {
        return <Panel key={feature.id} data={feature} panelType="feature" />
    })

    return(
        <div className="overflow-hidden">
            {classPanels}
            {featurePanels}
            <Sidebar />
        </div>
    )
}