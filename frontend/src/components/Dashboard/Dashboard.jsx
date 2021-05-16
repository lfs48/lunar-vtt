import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import entityTypes from '../../util/types/entityTypes';
import Panel from '../Panel/Panel';
import Sidebar from '../Sidebar/Sidebar';

export default function Dashboard() {

    const {panels, entities} = useSelector( (state) => ({
        panels: state.UI.panels,
        entities: state.entities
    }));

    const panelComponents = panels.map( (panel) => {
        return (
            <Panel 
                key={panel.id} 
                data={entities[panel.panelType][panel.id]} 
                panelType={panel.panelType} 
                edit={panel.edit}
            />
        )
    })

    return(
        <div className="overflow-hidden">
            {panelComponents}
            <Sidebar />
        </div>
    )
}