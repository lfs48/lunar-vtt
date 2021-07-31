import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DiceRoll } from 'rpg-dice-roller';
import { intToOrdinal } from '../../../../util/functions/utilFunctions';
import MarkdownText from '../../../Util/MarkdownText';
import Collapsable from "../../../Util/Collapsable";
import tw from 'tailwind-styled-components';
import Divider from '../../../Util/Divider';

const RacePanel = React.memo( function({race, className=""}) {

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    const featureSections = race.features
    .map( (id) => {
        const feature = features[id];
        return(
            <Collapsable
                key={feature.id}
                className="mb-4"
                header={
                    <span>
                        <strong className="text-lg mr-2">{feature.name}</strong> 
                    </span>
                }
            >
                <MarkdownText className="pt-2" text={feature.description} />
            </Collapsable>
        )
    });

    return(
        <div className={className}>
            <MarkdownText className="italic mb-6" text={race.description} />
            <Divider />
            {featureSections}
        </div>
    )
})

export default RacePanel;