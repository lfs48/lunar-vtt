import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MarkdownText from '../../../Util/MarkdownText';
import Collapsable from "../../../Util/Collapsable";
import { intToOrdinal } from '../../../../util/functions/utilFunctions';
import { merge } from 'lodash';

const SubclassPanel = React.memo(function SubclassPanel({subclass, className=""}) {

    let subclassFeatures = [];

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    const sortedFeatures = merge([], subclass.levelFeatures)
    .sort( (f1, f2) => {
        const l1 = f1.level;
        const l2 = f2.level;
        if (l1 > l2) {
            return 1
        } else if (l2 > l1) {
            return -1;
        } else {
            return 0;
        }
    })

    const featureSections = sortedFeatures
    .sort( (f1, f2) => {
        const l1 = f1.level;
        const l2 = f2.level;
        if (l1 > l2) {
            return 1
        } else if (l2 > l1) {
            return -1;
        } else {
            return 0;
        }
    })
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
            <MarkdownText text={subclass.description} className="italic"/>
            {featureSections}
        </div>
    )
});

export default SubclassPanel;