import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faDiceD20, faBookReader, faHatWizard, faRing, faMeteor, faSpider, faCog, faMale, faAward, faFistRaised } from '@fortawesome/free-solid-svg-icons';
import tw from 'tailwind-styled-components';
import tabTypes from './tabTypes';
import { Button } from '../../styles/components';

const tabData = [
    {
        name: tabTypes.CHARACTERS,
        icon: faAddressBook
    },
    {
        name: tabTypes.CLASSES,
        icon: faHatWizard
    },
    {
        name: tabTypes.RACES,
        icon: faMale
    },
    {
        name: tabTypes.FEATURES,
        icon: faFistRaised
    },
    {
        name: tabTypes.SPELLS,
        icon: faMeteor
    },
    {
        name: tabTypes.FEATS,
        icon: faAward
    },
    {
        name: tabTypes.ITEMS,
        icon: faRing
    },
    {
        name: tabTypes.MONSTERS,
        icon: faSpider
    },
    {
        name: tabTypes.ROLLABLE,
        icon: faDiceD20
    },
    {
        name: tabTypes.RULES,
        icon: faBookReader
    },
    {
        name: tabTypes.SETTINGS,
        icon: faCog
    },
];

export default function SidebarTabs({state, setState}) {

    const tabs = tabData.map( (data, i) => {
        return(
            <TabButton key={i} className="has-tooltip" onClick={() => setState(data.name)}>
                <FontAwesomeIcon icon={data.icon} />
                <p className="tooltip">{data.name}</p>
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