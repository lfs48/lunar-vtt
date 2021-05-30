import React, { useEffect } from 'react';
import MarkdownText from '../../Util/MarkdownText';

const SubclassPanel = React.memo(function SubclassPanel({subclass, className=""}) {

    return(
        <div className={className}>
            <MarkdownText text={subclass.description} />
        </div>
    )
});

export default SubclassPanel;