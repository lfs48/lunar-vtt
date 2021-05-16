import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel, togglePanel } from '../../store/reducers/UI/panelsReducer';
import { SidebarLi } from './styles';

export default function Tab({entityType}) {

    const dispatch = useDispatch();

    const {entities, openEntities} = useSelector( (state) => ({
        entities: state.entities[entityType],
        openEntities: state.UI.panels.filter( (panel) => panel.panelType === entityType ).map( (panel) => panel.id )
    }));

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

    const lis = Object.values(entities).map( (entity, i) => {
        return (
            <SidebarLi key={i} open={openEntities.includes(entity._id)} onClick={(e) => handleLiClick(e, entity._id)}>
                {'icon' in entity ?
                    <i class={`fas fa-${entity.icon} mr-2`}></i>
                :<></>}
                {entity.name}
            </SidebarLi>
        )
    })

    return(
        <div>
            <ul>
                {lis}
            </ul>
        </div>
    )
}