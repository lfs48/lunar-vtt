import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import entityTypes from '../../../util/types/entityTypes';
import { Block, PanelSectionHeader, PanelSubsectionHeader, panelContentClasses, FeatureHeader, FeatureHeaderSub } from '../styles';
import { pick, findKey } from 'lodash';
import PanelLink from '../PanelLink';
import SplitText from '../../Util/SplitText';

export default function SubclassPanel({subclass, styleData}) {

    return(
        <div style={styleData} className={panelContentClasses}>
            <SplitText text={subclass.description} />
        </div>
    )
}