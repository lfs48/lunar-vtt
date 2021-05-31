import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import entityTypes, { sourceModelToEntityType } from '../../../util/types/entityTypes';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';
import { pick, findKey } from 'lodash';
import MarkdownText from '../../Util/MarkdownText';
import EntityLink from '../../Entities/EntityLink';

const FeaturePanel = React.memo(function FeaturePanel({feature, className=""}) {

    const slice = sourceModelToEntityType(feature.sourceModel);

    const {sources} = useSelector( (state) => ({
        sources: Object.values( pick(state.entities[slice], feature.sources) )
    }));

    const sourceLinks = sources.map( (source) => {
        return(
            <EntityLink
                key={source._id}
                entityType={slice}
                id={source._id}
            >
                {`${source.name}${slice === entityTypes.CLASSES || slice === entityTypes.SUBCLASSES ? " " + findKey( source.features, arr => arr.includes(feature._id) ): ""}`}
            </EntityLink>
        )
    });

    return(
        <div className={className}>
            <MarkdownText text={feature.description} />
            <p>Sources: </p>
            {sourceLinks}
        </div>
    )
});

export default FeaturePanel;