import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { Button } from '../../styles/components';

export default function Collapsable({header, children, className=""}) {

    const [collapsed, setCollapsed] = useState(false);
    const [id, _] = useState(Math.random());
    const height = document.getElementById(`collapsable-${id}`)?.firstChild.offsetHeight;

    return(
        <CollapsableContainer className={className}>
            <CollapsableHeader onClick={() => setCollapsed(!collapsed)}>
                {header}
                <Button onClick={() => setCollapsed(!collapsed)}>
                    <CollapseIcon collapsed={collapsed}></CollapseIcon>
                </Button>
            </CollapsableHeader>
        <div 
            id={`collapsable-${id}`} 
            className={`block overflow-hidden transition-all ease-in duration-500`} 
            style={collapsed ? {height: 0} : {height: height}}
        >
            {children}
        </div>
    </CollapsableContainer>
    )
}

const CollapsableContainer = tw.div`

`

const CollapsableHeader = tw.header`
    border-b
    border-black
    pb-1
    mb-1
    w-full
    cursor-pointer
    flex
    justify-between
    items-end 
    pr-6
`

const CollapseIcon = tw.i`
    fas fa-caret-right 
    transform 
    origin-center 
    transition-transform 
    duration-500
    ${p => p.collapsed ? "" : "rotate-90"}
`