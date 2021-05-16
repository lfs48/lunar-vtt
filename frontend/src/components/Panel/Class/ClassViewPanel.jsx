import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DiceRoll } from 'rpg-dice-roller';
import ClassTable from './ClassTable';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';
import { intToOrdinal } from '../../../util/functions/utilFunctions';
import { ClassFeatureView } from './ClassFeatureView';

export default function ClassViewPanel({dndClass, styleData}) {

    const roll = new DiceRoll(dndClass.hitDie);

    let classFeatures = [];
    let featureSections = [];

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    Object.entries(dndClass.features).forEach( ([key, arr]) => {
        arr.forEach( (id) => {
            const feature = features[id];
            classFeatures.push(feature);
            featureSections.push(<ClassFeatureView key={feature._id} feature={feature} level={key} />)
        })
    });;

    return(
        <div style={styleData} className={panelContentClasses}>
            <p className="italic mb-6">{dndClass.description}</p>
            <ClassTable dndClass={dndClass} features={classFeatures}/>
            <PanelSectionHeader>Class Features</PanelSectionHeader>
            <p className="mb-2">{`As a ${dndClass.name.toLowerCase()}, you get the following class features.`}</p>
            <PanelSubsectionHeader>Hit Points</PanelSubsectionHeader>
            <Block>
            <p>
                <strong>Hit Dice: </strong>
                {dndClass.hitDie + " per barbarian level"}
            </p>
            <p>
                <strong>Hit Points at 1st Level: </strong>
                {roll.maxTotal + " + plus your Constitution modifier"}
            </p>
            <p>
                <strong>Hit Points at Higher Levels: </strong>
                {Math.ceil(roll.averageTotal) + " + plus your Constitution modifier per barbarian level after 1st"}
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
            {featureSections}
        </div>
    )
}