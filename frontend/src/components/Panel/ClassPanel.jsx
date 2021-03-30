import React from 'react';
import { DiceRoll } from 'rpg-dice-roller';
import { Block, PanelContent, PanelSectionHeader, PanelSubsectionHeader, panelContentClassnames } from './styles';

export default function ClassPanel({dndClass, styleData}) {
    const roll = new DiceRoll(dndClass.hitDie)
    return(
        <div style={styleData} className={panelContentClassnames}>
            <p className="italic mb-2">{dndClass.description}</p>
            <PanelSectionHeader>Class Features</PanelSectionHeader>
            <p className="mb-2">As a barbarian, you get the following class features.</p>
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
                <ul className="list-disc">
                    {dndClass.equipment.map( (line, i) => {
                        const options = line.join(" OR ");
                        return <li>{options}</li>
                    })}
                </ul>
            </Block>
        </div>
    )
}