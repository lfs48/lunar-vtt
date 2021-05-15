import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DiceRoll } from 'rpg-dice-roller';
import ClassTable from './ClassTable';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';

export default function ClassViewPanel({dndClass, styleData}) {

    const roll = new DiceRoll(dndClass.hitDie);

    const featureIds = [...Array(20)];
    dndClass.features.forEach( (f) => {
        featureIds.push(f.feature);
    });
    const {features} = useSelector( (state) => ({
        features: Object.values(state.entities.features).filter( feature => featureIds.includes(feature._id))
    }));
    
    const sortedFeatures = features.sort( (a, b) => {
        if (featureIds.indexOf(a.id) < featureIds.indexOf(b.id)) {
            return -1;
        } else if (featureIds.indexOf(a.id) > featureIds.indexOf(b.id)) {
            return 1;
        } else {
            return 0;
        }
    })
    const featureSections = sortedFeatures.map( (feature) => {
        return(
            <div key={feature._id} className="pb-2">
                <FeatureHeader>{feature.name} <FeatureHeaderSub>{` (${feature.featureType})`}</FeatureHeaderSub> </FeatureHeader>
                <div>
                    <p>{feature.description}</p>
                </div>
            </div>
        );
    });

    return(
        <div style={styleData} className={panelContentClasses}>
            <p className="italic mb-6">{dndClass.description}</p>
            <ClassTable dndClass={dndClass} features={features}/>
            <PanelSectionHeader>Class Features</PanelSectionHeader>
            <p className="mb-2">{`As a ${dndClass.name.toLowerCase()}, you get the following class features.`}</p>
            <PanelSubsectionHeader>Hit Points</PanelSubsectionHeader>
            <Block>
            <p>
                <strong>Hit Dice: </strong>
                {dndClass.hitDie + "per barbarian level"}
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
                    <strong>Armor: </strong>
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
                    <strong>Skill Points: </strong>
                    {dndClass.skills}
                </p>
            </Block>
            <PanelSubsectionHeader>Equipment</PanelSubsectionHeader>
            <Block>
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