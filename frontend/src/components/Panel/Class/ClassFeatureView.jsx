import React, { useEffect, useState } from 'react';
import { Button } from '../../../styles/components';
import { intToOrdinal } from '../../../util/functions/utilFunctions';
import SplitText from '../../Util/SplitText';
import { FeatureHeader, FeatureHeaderSub } from '../styles';

export function ClassFeatureView({feature, level}) {

    const [collapsed, setCollapsed] = useState(false);
    const height = document.getElementById(`panel-classfeature-desc-${feature._id}`)?.offsetHeight;

    return(
        <div id={`panel-classfeature-${feature._id}`} className="pb-2">
        <FeatureHeader>
            <div className="flex justify-between items-end pr-6">
                {feature.name}
                <FeatureHeaderSub>
                    <span className="mr-6">{`${intToOrdinal(level)} Level`}</span>
                    <Button onClick={() => setCollapsed(!collapsed)}>
                        <i className={collapsed ? "fas fa-caret-right" : "fas fa-caret-down"}></i>
                    </Button>
                </FeatureHeaderSub>
            </div>
        </FeatureHeader>
        <div className={`block overflow-hidden transition-all ease-in duration-500`} style={collapsed ? {height: 0} : {height: height}}>
            <SplitText id={`panel-classfeature-desc-${feature._id}`} text={feature.description}/>
        </div>
    </div>
    )
}