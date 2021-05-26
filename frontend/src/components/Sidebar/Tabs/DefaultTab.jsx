import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel } from '../../../store/reducers/UI/panelsReducer';
import { SidebarLi, TabHeader } from '../styles';
import { getCreateForm } from '../CreateForm/index';
import { ClearInput, Input } from '../../../styles/components';

export default function DefaultTab({entityType}) {

    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState("");

    const {entities, openEntities, user} = useSelector( (state) => ({
        entities: state.entities[entityType],
        openEntities: state.UI.panels.filter( (panel) => panel.panelType === entityType ).map( (panel) => panel.id ),
        user: state.session.user
    }));

    const filteredEntities = Object.values(entities)
    .filter( (entity) => entity.name.toLowerCase().startsWith(searchInput.toLowerCase()) )
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

    return(
        <div>
            <TabHeader>
                <div className="bg-gray-300 flex items-center py-1 px-2 rounded">
                    <i className="fas fa-search mr-2"></i>
                    <input
                        type="text"
                        value={searchInput}
                        placeholder="Search"
                        onChange={e => setSearchInput(e.target.value)}
                        className="bg-gray-300 focus:outline-none"
                    ></input>
                </div>
                {user.gm ?
                    getCreateForm(entityType)
                :<></>}
            </TabHeader>
            <ul>
                {lis}
            </ul>
        </div>
    )
}