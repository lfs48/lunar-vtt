import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel } from '../../../store/reducers/UI/panelsReducer';
import { SidebarLi, TabHeader } from '../styles';
import { Button, ClearInput, Input } from '../../../styles/components';
import { openModal } from '../../../store/reducers/UI/modalReducer';
import { modalTypes } from '../../../util/types/modalTypes';
import SearchInput from '../../Util/SearchInput';
import { getEntityModalType } from '../../../util/types/entityTypes';

export default function DefaultTab({entityType}) {

    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState({
        value: ""
    });

    const {entities, openEntities, user} = useSelector( (state) => ({
        entities: state.entities[entityType],
        openEntities: state.UI.panels.filter( (panel) => panel.panelType === entityType ).map( (panel) => panel.id ),
        user: state.session.user
    }));

    const filteredEntities = Object.values(entities)
    .filter( (entity) => entity.name.toLowerCase().startsWith(searchInput.value.toLowerCase()) )
    .sort( (feature1, feature2) => {
        const a = feature1.name.toLowerCase();
        const b = feature2.name.toLowerCase();
        if (a > b) { return 1; }
        else if (b > a) { return -1; }
        else { return 0; }
    });

    const handleLiClick = (event, id) => {
        event.preventDefault();
        const action = {
            type: openPanel.type,
            payload: {
                panelType: entityType,
                id: id
            }
        };
        dispatch(action);
    }

    const lis = filteredEntities.map( (entity, i) => {
        return (
            <SidebarLi key={i} open={openEntities.includes(entity._id)} onClick={(e) => handleLiClick(e, entity._id)}>
                {'icon' in entity ?
                    <i class={`fas fa-${entity.icon} mr-2`}></i>
                :<></>}
                {entity.name}
            </SidebarLi>
        )
    });

    const handleCreate = () => {
        const action = {
            type: openModal.type,
            payload: {
                modalType: getEntityModalType(entityType)
            }
        }
        dispatch(action);
    }

    return(
        <div>
            <TabHeader>
                <SearchInput
                    field="value"
                    input={searchInput}
                    setInput={setSearchInput}
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
            <ul>
                {lis}
            </ul>
        </div>
    )
}