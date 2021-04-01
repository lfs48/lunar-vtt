import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DiceRoll } from 'rpg-dice-roller';
import ClassTable from './ClassTable';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';

export default function ClassFormPanel({dndClass, styleData}) {

    const roll = new DiceRoll(dndClass.hitDie);

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        hitdie: "",
        armor: "",
        weapons: "",
        tools: "",
        saves: "",
        skills: "",
        equipment: [],
        classTableCols: [],
        classTable: [...Array(20).keys()].map( (_) => ({features: []}))
    })
    

    return(
        <div style={styleData} className={panelContentClasses}>

        </div>
    )
}