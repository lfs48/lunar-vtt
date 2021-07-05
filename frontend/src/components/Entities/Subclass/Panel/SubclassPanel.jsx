import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MarkdownText from '../../../Util/MarkdownText';
import Collapsable from "../../../Util/Collapsable";
import { intToOrdinal } from '../../../../util/functions/utilFunctions';

const SubclassPanel = React.memo(function SubclassPanel({subclass, className=""}) {

    let subclassFeatures = [];

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    const featureSections = subclass.levelFeatures
    .map( (levelFeature) => {
        const level = levelFeature.level;
        const feature = features[levelFeature.feature];
        subclassFeatures.push(feature);
        return(
            <Collapsable
                key={feature.id}
                className="mb-4"
                header={
                    <span>
                        <strong className="text-lg mr-2">{feature.name}</strong> 
                        <i className="text-sm">({intToOrdinal(level)} level)</i>
                    </span>
                }
            >
                <MarkdownText className="pt-2" text={feature.description} />
            </Collapsable>
        )
    });
    
    return(
        <div className={className}>
            <MarkdownText text={subclass.description} />
            {featureSections}
        </div>
    )
});

export default SubclassPanel;