import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MarkdownText from '../../../Util/MarkdownText';
import Collapsable from "../../../Util/Collapsable";
import { intToOrdinal } from '../../../../util/functions/utilFunctions';

const SubclassPanel = React.memo(function SubclassPanel({subclass, className=""}) {

    let subclassFeatures = [];
    let featureSections = [];

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    Object.entries(subclass.features).forEach( ([level, arr]) => {
        arr.forEach( (id) => {
            const feature = features[id];
            subclassFeatures.push(feature);
            featureSections.push(
                <Collapsable
                    key={id}
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
        })
    });;

    return(
        <div className={className}>
            <MarkdownText text={subclass.description} />
            {featureSections}
        </div>
    )
});

export default SubclassPanel;