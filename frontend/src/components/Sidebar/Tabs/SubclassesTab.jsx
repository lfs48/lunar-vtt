import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel } from '../../../store/reducers/UI/panelsReducer';
import { SidebarLi, TabHeader } from '../styles';
import { getCreateForm } from '../CreateForm/index';
import entityTypes from '../../../util/types/entityTypes';
import tw from 'tailwind-styled-components';
import Collapsable from '../../Util/Collapsable';

export default function SubclassesTab() {

    const dispatch = useDispatch();

    const {dndClasses, subclasses, openSubclasses, user} = useSelector( (state) => ({
        dndClasses: state.entities.dndClasses,
        subclasses: state.entities.subclasses,
        openSubclasses: state.UI.panels.filter( (panel) => panel.panelType === entityTypes.SUBCLASSES ).map( (panel) => panel.id ),
        user: state.session.user
    }));

    const handleLiClick = (event, id) => {
        event.preventDefault();
        const action = {
            type: openPanel.type,
            payload: {
                panelType: entityTypes.SUBCLASSES,
                id: id
            }
        };
        dispatch(action);
    }

    const sections = Object.values(dndClasses).map( (dndClass) => {
        return(
            <ClassSectionContainer>
                <Collapsable 
                key={dndClass._id}
                header={
                    <ClassSectionHeader>{dndClass.name}</ClassSectionHeader>
                }
                >
                <SubclassList>
                    {dndClass.subclasses.map( (id) => {
                        const subclass = subclasses[id];
                        return(
                            <SubclassLi key={id} open={openSubclasses.includes(id)} onClick={(e) => handleLiClick(e, id)}>
                                {subclass.name}
                            </SubclassLi>
                        )
                    })}
                </SubclassList>
            </Collapsable>
            </ClassSectionContainer>
        )
    });

    return(
        <div>
            <TabHeader>
                {user.gm ?
                    getCreateForm(entityTypes.SUBCLASSES)
                :<></>}
            </TabHeader>
            {sections}
        </div>
    )
}

const ClassSectionContainer = tw.div`
    mx-2
    mb-2
`

const ClassSectionHeader = tw.h1`
    text-lg
    font-bold
    pl-2
`
const SubclassList = tw.ul`
`

const SubclassLi = tw(SidebarLi)`
    border-none
`