import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

export default function Collapsable({header, children, className="", update=null}) {

    const foobar = update;
    const [collapsed, setCollapsed] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [id, _] = useState(Math.random());
    const [height, setHeight] = useState(document.getElementById(`collapsable-${id}`)?.firstChild.offsetHeight)
    
    useEffect( () => {
        setHeight(document.getElementById(`collapsable-${id}`)?.firstChild.offsetHeight);
    });

    const handleCollapseToggle = (bool) => {
        setTransitioning(true);
        setCollapsed(bool);
        setTimeout( () => {
            setTransitioning(false)
        }, 500);
    }

    return(
        <div className={className}>
            <CollapsableHeader onClick={() => handleCollapseToggle(!collapsed)}>
                {header}
                <CollapseIcon collapsed={collapsed}></CollapseIcon>
            </CollapsableHeader>
        <CollapsableContainer 
            id={`collapsable-${id}`} 
            className={`block overflow-hidden ${transitioning ? "transition-all ease-in duration-500" : ""}`} 
            style={collapsed ? {height: 0} : {height: height}}
        >
            {children}
        </CollapsableContainer>
    </div>
    )
}

const CollapsableContainer = tw.div`
    block
    overflow-hidden
    ${p => p.transitioning ? 
        `
            transition-all
            ease-in
            duration-500
        ` 
    : "" }
`

const CollapsableHeader = tw.header`
    border-b
    border-black
    pb-1
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