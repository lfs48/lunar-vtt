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
            <Collapsable 
                key={dndClass._id}
                header={
                    <span>{dndClass.name}</span>
                }
                >
                <ul>
                    {dndClass.subclasses.map( (id) => {
                        const subclass = subclasses[id];
                        return(
                            <SubclassLi key={id} open={openSubclasses.includes(id)} onClick={(e) => handleLiClick(e, id)}>
                                {subclass.name}
                            </SubclassLi>
                        )
                    })}
                </ul>
            </Collapsable>
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

function ClassSection ({dndClass, subclasses, openSubclasses}) {

    const dispatch = useDispatch();

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

    return(
        <ClassSectionContainer>
            <ClassSectionHeader>
                {dndClass.name}
                <i className="fas fa-caret-right"></i>
            </ClassSectionHeader>
            <ul>
                {dndClass.subclasses.map( (id) => {
                    const subclass = subclasses[id];
                    return(
                        <SubclassLi key={id} open={openSubclasses.includes(id)} onClick={(e) => handleLiClick(e, id)}>
                            {subclass.name}
                        </SubclassLi>
                    )
                })}
            </ul>
        </ClassSectionContainer>
    );
}

const ClassSectionContainer = tw.div`
    mx-2
    mb-2
    border-b
    border-black
`

const ClassSectionHeader = tw.h1`
    text-lg
    font-bold
    border-b
    border-black
    border-opacity-50
    flex
    justify-between
    items-center
    pr-4
    cursor-pointer
`

const SubclassLi = tw(SidebarLi)`
    border-none
`