import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MarkdownText from '../../../Util/MarkdownText';
import Collapsable from "../../../Util/Collapsable";
import Divider from '../../../Util/Divider';

const BackgroundPanel = React.memo( function({background, className=""}) {

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    const featureSections = background.features
    .map( (id) => {
        const feature = features[id];
        return(
            <Collapsable
                key={feature.id}
                className="mb-4"
                header={
                    <span>
                        <strong className="text-lg mr-2">{feature.name}</strong> 
                    </span>
                }
            >
                <MarkdownText className="pt-2" text={feature.description} />
            </Collapsable>
        )
    });

    return(
        <div className={className}>
            <MarkdownText className="italic mb-6" text={background.description} />
            <Divider />
            {featureSections}
        </div>
    )
})

export default BackgroundPanel;