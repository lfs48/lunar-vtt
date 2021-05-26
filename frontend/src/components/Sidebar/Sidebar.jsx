import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import SidebarTabs from './SidebarTabs';
import entityTypes from '../../util/types/entityTypes';
import { getEntityTab } from './Tabs/index';

export default function Sidebar() {

    const [tab, setTab] = useState(entityTypes.CLASSES);
    
    return(
        <StyledSidebar>
            <div className="relative">
                <SidebarTabs state={tab} setState={setTab}/>
                <div className="">
                    {getEntityTab(tab)}
                </div>
            </div>
        </StyledSidebar>
    )
}

const StyledSidebar = tw.div`
    fixed
    right-0
    top-0
    h-screen
    w-120
    border-l
    border-black
    overflow-y-scroll
    overflow-x-hidden
`