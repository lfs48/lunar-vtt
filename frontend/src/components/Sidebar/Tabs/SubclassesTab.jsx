import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel } from '../../../store/reducers/UI/panelsReducer';
import { SidebarLi, TabHeader } from '../styles';
import entityTypes from '../../../util/types/entityTypes';
import tw from 'tailwind-styled-components';
import Collapsable from '../../Util/Collapsable';
import SearchInput from '../../Util/SearchInput';
import { merge } from 'lodash';
import { openModal } from '../../../store/reducers/UI/modalReducer';
import { Button } from '../../../styles/components';
import { modalTypes } from '../../../util/types/modalTypes';

export default function SubclassesTab() {

    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        search: "",
        sourceType: null
    });

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

    const matchesFilters = (subclass) => {
        return ( subclass.name.toLowerCase().includes(filters.search.toLocaleLowerCase() ) )
    }
    const filteredSubclasses = Object.values(subclasses)
    .filter( (subclass) => subclass.name.toLowerCase().startsWith(filters.search.toLowerCase()) )
    .sort( (sub1, sub2) => {
        const a = sub1.name.toLowerCase();
        const b = sub2.name.toLowerCase();
        if (a > b) { return 1; }
        else if (b > a) { return -1; }
        else { return 0; }
    });

    const sections = [...Object.values(dndClasses)]
    .sort( (c1, c2) => {
        const a = c1.name.toLowerCase();
        const b = c2.name.toLowerCase();
        if (a > b) { return 1; }
        else if (b > a) { return -1; }
        else { return 0; }
    })
    .map( (dndClass) => {
        return(
            <ClassSectionContainer>
                <Collapsable 
                    key={dndClass._id}
                    header={
                        <ClassSectionHeader>{dndClass.name}</ClassSectionHeader>
                    }
                >
                    <SubclassList>
                        {
                        merge([], dndClass.subclasses)
                        .sort( (id1, id2) => {
                            const sub1 = subclasses[id1].name.toLowerCase();
                            const sub2 = subclasses[id2].name.toLowerCase();
                            if (sub1 > sub2) { return 1; }
                            else if (sub2 > sub1) { return -1; }
                            else { return 0; }
                        })
                        .map( (id) => {
                            const subclass = subclasses[id];
                                return(
                                    <SubclassLi 
                                        key={id} 
                                        open={openSubclasses.includes(id)} 
                                        onClick={(e) => handleLiClick(e, id)}
                                        matchesFilters={matchesFilters(subclass)}
                                    >
                                        {subclass.name}
                                    </SubclassLi>
                                )
                        })}
                    </SubclassList>
                </Collapsable>
            </ClassSectionContainer>
        )
    });

    const handleCreate = () => {
        const action = {
            type: openModal.type,
            payload: {
                modalType: modalTypes.SUBCLASSFORM,
            }
        }
        dispatch(action);
    }

    return(
        <div>
            <TabHeader>
                <SearchInput 
                    field="search"
                    input={filters}
                    setInput={setFilters}
                    className="w-2/3"
                />
                {user.gm ?
                    <Button
                        onClick={() => handleCreate()}
                    >
                        Add
                    </Button>
                :<></>}
            </TabHeader>
            <div className="overflow-y-scroll h-[calc(100vh-8rem)]">
                {sections}
            </div>
        </div>
    )
}

const ClassSectionContainer = tw.div`
    mx-2
    mt-2
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
    transition-all
    ${p => p.matchesFilters ? "" : "hidden"}
`