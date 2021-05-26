import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tw from 'tailwind-styled-components';
import { Button } from '../../styles/components';
import entityTypes, { getEntityIcon, getEntityName } from '../../util/types/entityTypes';

export default function SidebarTabs({state, setState}) {

    const tabs = Object.values(entityTypes).map( (type, i) => {
        return(
            <TabButton key={i} activeTab={state === type} onClick={() => setState(type)}>
                <i className={`${getEntityIcon(type)}`}></i>
                <p className="tooltip text-black">{getEntityName(type)}</p>
            </TabButton>
        )
    });

    return(
        <div className="w-full h-12 flex sticky top-0 left-0 justify-evenly py-2 border-b border-black">
            {tabs}
        </div>
    );
}

const TabButton = tw(Button)`
    text-xl
    has-tooltip 
    transition-colors 
    duration-500 
    rounded-full 
    w-8 
    h-8 
    ${p => p.activeTab ? "text-black" : "text-gray-300"}

`