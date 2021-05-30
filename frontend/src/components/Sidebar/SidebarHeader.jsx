import React from 'react';
import tw from 'tailwind-styled-components';
import { Button } from '../../styles/components';
import entityTypes, { getEntityIcon, getEntityName } from '../../util/types/entityTypes';

export default function SidebarHeader({state, setState}) {

    const tabs = Object.values(entityTypes).map( (type, i) => {
        return(
            <TabButton key={i} activeTab={state === type} onClick={() => setState(type)}>
                <i className={`${getEntityIcon(type)}`}></i>
                <p className={`tooltip text-black ${(i === Object.values(entityTypes).length - 1) ? "right-0" : "left-0"}`}>{getEntityName(type)}</p>
            </TabButton>
        )
    });

    return(
        <SidebarHeaderContainer>
            {tabs}
        </SidebarHeaderContainer>
    );
}

const SidebarHeaderContainer = tw.div`
    w-full 
    flex
    flex-wrap
    sticky 
    top-0 
    left-0 
    justify-evenly 
    py-2 
    border-b 
    border-black
`

const TabButton = tw(Button)`
    has-tooltip
    text-xl
    transition-colors 
    duration-500 
    rounded-full 
    w-8 
    h-8 
    ${p => p.activeTab ? "text-black" : "text-gray-300 hover:text-gray-400"}
`