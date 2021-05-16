import React, { useEffect, useState } from 'react';
import { Button } from '../../../styles/components';
import { intToOrdinal } from '../../../util/functions/utilFunctions';
import { FeatureHeader, FeatureHeaderSub } from '../styles';

export function ClassFeatureForm({feature, level}) {

    const [collapsed, setCollapsed] = useState(false);
    const [descHeight, setDescHeight] = useState(0);

    useEffect( () => {
        const el = document.getElementById(`panel-classfeature-desc-${feature._id}`);
        if (el && el.offsetHeight > descHeight) {
            setDescHeight(el.offsetHeight);
        }
    }, []);

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
        <p id={`panel-classfeature-desc-${feature._id}`} className={`overflow-hidden transition-all duration-500 ${collapsed ? "opacity-0" : "opacity-100"}`} style={collapsed ? {height: 0} : {height: descHeight > 0 ? descHeight : 'auto'}}>
            {feature.description}
        </p>
    </div>
    )
}