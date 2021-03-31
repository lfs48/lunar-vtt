import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tw from 'tailwind-styled-components';
import { Button } from '../../styles/components';
import entityTypes, { getEntityIcon, getEntityName } from '../../util/types/entityTypes';
import { faAddressBook, faDiceD20, faBookReader, faHatWizard, faRing, faMeteor, faSpider, faCog, faMale, faAward, faFistRaised } from '@fortawesome/free-solid-svg-icons';

export default function SidebarTabs({state, setState}) {

    const tabs = Object.values(entityTypes).map( (type, i) => {
        return(
            <TabButton key={i} className="has-tooltip" onClick={() => setState(type)}>
                <FontAwesomeIcon icon={getEntityIcon(type)} />
                <p className="tooltip">{getEntityName(type)}</p>
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
`