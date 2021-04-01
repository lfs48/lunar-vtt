import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DiceRoll } from 'rpg-dice-roller';
import ClassTable from './ClassTable';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';
import DieSelect from '../../Util/DieSelect';

export default function ClassFormPanel({dndClass, styleData}) {

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        hitdie: "1d6",
        armor: "",
        weapons: "",
        tools: "",
        saves: "",
        skills: "",
        equipment: [],
        classTableCols: [],
        classTable: [...Array(20).keys()].map( (_) => ({features: []}))
    });

    const roll = new DiceRoll(dndClass.hitDie);
    
    return(
        <div style={styleData} className={panelContentClasses}>
            <div>
                <label>Hit Die: </label>
                <DieSelect field={'hitdie'} state={inputs} setState={setInputs} />
            </div>
        </div>
    )
}