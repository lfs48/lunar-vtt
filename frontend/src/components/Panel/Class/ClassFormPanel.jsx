import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DiceRoll } from 'rpg-dice-roller';
import ClassTable from './ClassTable';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';
import DieSelect from '../../Util/DieSelect';
import { handleInput } from '../../../util/functions/utilFunctions';
import { TextArea } from '../../../styles/components';
import ClassFormTable from './ClassFormTable';

export default function ClassFormPanel({dndClass, styleData, preloadedInputs=null, inputs, setInputs}) {

    useEffect( () => {
        if (preloadedInputs) {
            setInputs(preloadedInputs);
        }
    }, []);

    const roll = new DiceRoll(dndClass.hitDie);
    
    return(
        <div style={styleData} className={panelContentClasses}>
            <TextArea
                className="mb-2"
                value={inputs.description}
                onChange={e => handleInput(e, 'description', inputs, setInputs)}
            ></TextArea>
            <ClassFormTable dndClass={dndClass}/>
            <div>
                <label>Hit Die: </label>
                <DieSelect field={'hitdie'} state={inputs} setState={setInputs} />
            </div>
        </div>
    )
}