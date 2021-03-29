import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePanel } from '../../store/reducers/UI/panelsReducer';
import { SidebarLi } from './styles';

export default function ClassesTab() {

    const dispatch = useDispatch();

    const {dndClasses, openClasses} = useSelector( (state) => ({
        dndClasses: state.entities.dndClasses,
        openClasses: state.UI.panels.dndClass
    }));

    const handleLiClick = (event, id) => {
        event.preventDefault();
        const action = {
            type: togglePanel.type,
            payload: {
                panelType: 'dndClass',
                id: id
            }
        };
        dispatch(action);
    }

    const classLis = Object.values(dndClasses).map( (dndClass, i) => {
        return <SidebarLi key={i} open={openClasses.includes(dndClass.id)} onClick={(e) => handleLiClick(e, dndClass.id)}>{dndClass.name}</SidebarLi>
    })

    return(
        <div>
            <ul>
                {classLis}
            </ul>
        </div>
    )
}