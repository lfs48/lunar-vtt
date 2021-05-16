import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';

export default function FeaturePanel({feature, styleData}) {

    return(
        <div style={styleData} className={panelContentClasses}>
            <p>{feature.description}</p>
        </div>
    )
}