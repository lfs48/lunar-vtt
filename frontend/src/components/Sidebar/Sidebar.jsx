import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import SidebarHeader from './SidebarHeader';
import entityTypes from '../../util/types/entityTypes';
import { getEntityTab } from './Tabs/index';

export default function Sidebar() {

    const [tab, setTab] = useState(entityTypes.CLASSES);
    
    return(
        <StyledSidebar>
            <div className="relative">
                <SidebarHeader state={tab} setState={setTab}/>
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
    overflow-y-hidden
    overflow-x-hidden
`