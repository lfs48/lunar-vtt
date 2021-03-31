import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePanel } from '../../store/reducers/UI/panelsReducer';
import { SidebarLi } from './styles';

export default function FeaturesTab() {

    const dispatch = useDispatch();

    const {features, openFeatures} = useSelector( (state) => ({
        features: state.entities.features,
        openFeatures: state.UI.panels.feature
    }));

    const handleLiClick = (event, id) => {
        event.preventDefault();
        const action = {
            type: togglePanel.type,
            payload: {
                panelType: 'feature',
                id: id
            }
        };
        dispatch(action);
    }

    const featureLis = Object.values(features).map( (feature, i) => {
        return <SidebarLi key={i} open={openFeatures.includes(feature.id)} onClick={(e) => handleLiClick(e, feature.id)}>{feature.name}</SidebarLi>
    })

    return(
        <div>
            <ul>
                {featureLis}
            </ul>
        </div>
    )
}