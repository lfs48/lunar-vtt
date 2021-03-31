import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePanel } from '../../store/reducers/UI/panelsReducer';
import { SidebarLi } from './styles';

export default function Tab({entityType}) {

    const dispatch = useDispatch();

    const {entities, openEntities} = useSelector( (state) => ({
        entities: state.entities[entityType],
        openEntities: state.UI.panels[entityType]
    }));

    const handleLiClick = (event, id) => {
        event.preventDefault();
        const action = {
            type: togglePanel.type,
            payload: {
                panelType: entityType,
                id: id
            }
        };
        dispatch(action);
    }

    const lis = Object.values(entities).map( (entity, i) => {
        return <SidebarLi key={i} open={openEntities.includes(entity.id)} onClick={(e) => handleLiClick(e, entity.id)}>{entity.name}</SidebarLi>
    })

    return(
        <div>
            <ul>
                {lis}
            </ul>
        </div>
    )
}