import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import ClassesTab from './ClassesTab';
import SidebarTabs from './SidebarTabs';
import tabTypes from './tabTypes';

export default function Sidebar() {

    const [tab, setTab] = useState(tabTypes.CHARACTERS);

    let activeTab = <></>;
    switch(tab) {
        case(tabTypes.CHARACTERS):
            activeTab = <p>CHARACTERS</p>;
            break;
        case(tabTypes.CLASSES):
            activeTab = <ClassesTab />
            break;
        case(tabTypes.RACES):
            activeTab = <p>RACES</p>
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
        case(tabTypes.MONSTERS):
            activeTab = <p>MONSTERS</p>;
            break;
        case(tabTypes.SETTINGS):
            activeTab = <p>SETTINGS</p>;
            break;
        default:
            activeTab: <></>;
    }

    return(
        <StyledSidebar>
            <div className="relative">
                <SidebarTabs state={tab} setState={setTab}/>
                <div className="">
                    {activeTab}
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