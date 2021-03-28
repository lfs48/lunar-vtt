import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import SidebarTabs from './SidebarTabs';
import tabTypes from './tabTypes';

export default function Sidebar() {

    const [tab, setTab] = useState(tabTypes.CHAT);

    let activeTab = <></>;
    switch(tab) {
        case(tabTypes.CHAT):
            activeTab = <p>CHAT</p>;
            break;
        case(tabTypes.CHARACTERS):
            activeTab = <p>CHARACTERS</p>;
            break;
        case(tabTypes.CLASSES):
            activeTab = <p>CLASSES</p>;
            break;
        case(tabTypes.SPELLS):
            activeTab = <p>SPELLS</p>;
            break;
        case(tabTypes.ITEMS):
            activeTab = <p>ITEMS</p>;
            break;
        case(tabTypes.RULES):
            activeTab = <p>RULES</p>;
            break;
        case(tabTypes.SETTINGS):
            activeTab = <p>SETTINGS</p>;
            break;
        default:
            activeTab: <></>;
    }

    return(
        <StyledSidebar>
            <SidebarTabs state={tab} setState={setTab}/>
            {activeTab}
        </StyledSidebar>
    )
}

const StyledSidebar = tw.div`
    fixed
    right-0
    top-12
    h-screen
    w-96
    bg-blue-300
    overflow-y-6scroll
`