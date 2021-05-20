import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import entityTypes from '../../../util/types/entityTypes';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';
import { pick, findKey } from 'lodash';
import PanelLink from '../PanelLink';
import SplitText from '../../Util/SplitText';

export default function FeaturePanel({feature, styleData}) {

    const slice = sourceModelToSlice(feature.sourceModel);

    const {sources} = useSelector( (state) => ({
        sources: Object.values( pick(state.entities[slice], feature.sources) )
    }));

    const sourceLinks = sources.map( (source) => {
        return(
            <PanelLink 
                key={source._id}
                panelType={slice}
                id={source._id}
                text={`${source.name}${slice === entityTypes.CLASSES ? " " + findKey( source.features, arr => arr.includes(feature._id) ): ""}`}
            />
        )
    });

    return(
        <div style={styleData} className={panelContentClasses}>
            <SplitText text={feature.description} />
            <p>Sources: </p>
            {sourceLinks}
        </div>
    )
}

function sourceModelToSlice(source) {
    const sourcesToModels = {
        'DndClass': entityTypes.CLASSES,
        'Feature': entityTypes.FEATURES
    }
    return sourcesToModels[source];
}