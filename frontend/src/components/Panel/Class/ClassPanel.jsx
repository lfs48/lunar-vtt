import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DiceRoll } from 'rpg-dice-roller';
import ClassTable from './ClassTable';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses } from '../styles';
import { intToOrdinal } from '../../../util/functions/utilFunctions';
import SplitText from '../../Util/SplitText';
import Collapsable from "../../Util/Collapsable";
import tw from 'tailwind-styled-components';
import Divider from '../../Util/Divider';

export default function ClassViewPanel({dndClass, styleData}) {

    const roll = new DiceRoll(dndClass.hitDie);

    let classFeatures = [];
    let featureSections = [];

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    Object.entries(dndClass.features).forEach( ([level, arr]) => {
        arr.forEach( (id) => {
            const feature = features[id];
            classFeatures.push(feature);
            featureSections.push(
                <Collapsable
                    key={id}
                    className="mb-4"
                    header={
                        <span>
                            <strong className="text-lg mr-2">{feature.name}</strong> 
                            <i className="text-sm">({intToOrdinal(level)} level)</i>
                        </span>
                    }
                >
                    <SplitText text={feature.description}/>
                </Collapsable>
            )
        })
    });;

    return(
        <div style={styleData} className={panelContentClasses}>
            <SplitText text={dndClass.description} className="italic mb-6"/>
            <ClassTable dndClass={dndClass} features={classFeatures}/>
            <ClassInfoContainer>
                <PanelSectionHeader>Class Features</PanelSectionHeader>
                <p className="mb-2">{`As a ${dndClass.name.toLowerCase()}, you get the following class features.`}</p>
                <PanelSubsectionHeader>Hit Points</PanelSubsectionHeader>
                <Block>
                <p>
                    <strong>Hit Dice: </strong>
                    {dndClass.hitDie + ` per ${dndClass.name.toLowerCase()} level`}
                </p>
                <p>
                    <strong>Hit Points at 1st Level: </strong>
                    {roll.maxTotal + " + plus your Constitution modifier"}
                </p>
                <p>
                    <strong>Hit Points at Higher Levels: </strong>
                    {Math.ceil(roll.averageTotal) + ` + plus your Constitution modifier per ${dndClass.name.toLowerCase()} level after 1st`}
                </p>
                </Block>
                <PanelSubsectionHeader>Proficiencies</PanelSubsectionHeader>
                <Block>
                    <p>
                        <strong>Armor: </strong>
                        {dndClass.armor}
                    </p>
                    <p>
                        <strong>Weapons: </strong>
                        {dndClass.weapons}
                    </p>
                    <p>
                        <strong>Tools: </strong>
                        {dndClass.tools}
                    </p>
                    <p>
                        <strong>Saving Throws: </strong>
                        {dndClass.saves}
                    </p>
                    <p>
                        <strong>Skills: </strong>
                        {dndClass.skills}
                    </p>
                </Block>
                <PanelSubsectionHeader>Equipment</PanelSubsectionHeader>
                <Block className="mb-6">
                    <p>
                        You start with the following equipment, in addition to the equipment granted by your background.
                    </p>
                    <div className="ml-8">
                        <ul className="list-disc">
                            {dndClass.equipment.map( (line, i) => {
                                return <li key={i}>{line}</li>
                            })}
                        </ul>
                    </div>
                </Block>
            </ClassInfoContainer>
            <Divider />
            {featureSections}
        </div>
    )
}

const ClassInfoContainer = tw.div`

`