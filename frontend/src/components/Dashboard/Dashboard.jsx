import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import entityTypes from '../../util/types/entityTypes';
import Panel from '../Panel/Panel';
import Sidebar from '../Sidebar/Sidebar';

export default function Dashboard() {

    const {classes, features} = useSelector( (state) => ({
        classes: Object.values(state.entities.dndClasses).filter( (dndClass) => state.UI.panels.dndClasses.includes(dndClass.id) ),
        features: Object.values(state.entities.features).filter( (feature) => state.UI.panels.features.includes(feature.id) )
    }));
    const classPanels = classes.map( (dndClass) => {
        return <Panel key={dndClass.id} data={dndClass} panelType={entityTypes.CLASSES}/>
    });
    const featurePanels = features.map( (feature) => {
        return <Panel key={feature.id} data={feature} panelType={entityTypes.FEATURES} />
    })

    return(
        <div className="overflow-hidden">
            {classPanels}
            {featurePanels}
            <Sidebar />
        </div>
    )
}