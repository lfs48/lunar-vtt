import React, {useState, useEffect} from 'react';
import { merge } from 'lodash';
import { Button } from '../../styles/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { togglePanel } from '../../store/reducers/UI/panelsReducer';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-styled-components';
import ClassPanel from './ClassPanel';
import { PanelHeader, PanelHeaderContainer } from './styles';
import {throttle} from 'lodash';

const handleDragStart = (event, styleData, setStyleData) => {
    event.preventDefault();
    if (!styleData.dragging) {
        const newState = merge({}, styleData);
        newState.dragPrevX = event.pageX;
        newState.dragPrevY = event.pageY;
        newState.dragging = true;
        setStyleData(newState);
    }
};

const _handleDrag = (event, styleData, setStyleData) => {
    event.preventDefault();
    const newState = merge({}, styleData);
    if (styleData.dragging) {
        if (event.pageX > 0) {
            newState.left += event.pageX - styleData.dragPrevX;
            newState.left = Math.max(newState.left, 0);
            newState.left = Math.min(newState.left, window.innerWidth - newState.width - 20);
            newState.dragPrevX = event.pageX;
        }
        if (event.pageY > 0) {
            newState.top += event.pageY - styleData.dragPrevY;
            newState.top = Math.min(newState.top, window.innerHeight - styleData.height - 5);
            newState.top = Math.max(newState.top, 0);
            newState.dragPrevY = event.pageY;
        }
        setStyleData(newState);
    } else {
        handleDragStart(event, styleData, setStyleData);
    }
};

const handleDrag = throttle(_handleDrag, 20);

const handleDragEnd = (event, styleData, setStyleData) => {
    event.preventDefault();
    const newState = merge({}, styleData);
    newState.dragPrevX = 0;
    newState.dragPrevY = 0;
    newState.dragging = false;
    setStyleData(newState);
};

export default function Panel({data, panelType}) {

    const dispatch = useDispatch();

    const [styleData, setStyleData] = useState({
        left: Math.max( Math.random() * window.innerWidth - 500, 0),
        top: Math.max( Math.random() * window.innerHeight - 400, 0),
        width: 800,
        height: 600,
        minHeight: 50,
        minWidth: 500,
        dragging: false,
        dragPrevX: null,
        dragPrevY: null,
        stage: 1,
        opacity: 0,
    });

    useEffect(() => {
        const newState = merge({}, styleData);
        newState.left += 100;
        newState.opacity = 1;
        setStyleData(newState);
        setTimeout( () => {
            const newerState = merge({}, newState);
            newerState.stage = 2;
            setStyleData(newerState);
        }, 720);
    }, []);

    const resize = (event, dirs) => {
        event.preventDefault();
        const newState = merge({}, styleData);

        if(event.pageX > 0 && event.pageX < window.innerWidth - 1) {
            if ("right" in dirs) {
                const newWidth = event.pageX - newState.left
                newState.width =  Math.max( newWidth, newState.minWidth );
            } else if ("left" in dirs) {
                const newWidth = newState.width + newState.left - event.pageX;
                newState.width = Math.max(newWidth, newState.minWidth);
                if (newState.width != styleData.width) {newState.left = event.pageX; }
            }
        }

        if(event.pageY > 0 && event.pageY < window.innerHeight - 1) {
            if ("top" in dirs) {
                const newHeight = newState.height + newState.top - event.pageY;
                newState.height = Math.max(newHeight, newState.minHeight);
                if (newState.height != styleData.height) {newState.top = event.pageY};
            } else if ("bottom" in dirs) {
                const newHeight = event.pageY - newState.top;
                newState.height = Math.max(newHeight, newState.minHeight);
            }
        }

        setStyleData(newState);
    };

    const handleClose = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        newState.stage = 1;
        newState.opacity = 0;
        newState.left -= 100;
        setStyleData(newState);
        setTimeout( () => {
            const action = {
                type: togglePanel.type,
                payload: {
                    id: data.id,
                    panelType: panelType
                }
            };
            dispatch(action);
        }, 720);
    };

    let content = <></>;
    switch(panelType) {
        case('dndClass'):
        content = <ClassPanel dndClass={data} styleData={{height: styleData.height - 50}}/>
        break;
    }
    
    return(
        <article draggable="true" className={`${panelClass} ${ styleData.stage < 2 ? "transition-all duration-700 ease-in-out" : ""} `} style={styleData}>

            <div className="resize-areas-container">
                <div draggable="true" className="resize-area resize-top" onDrag={ e => resize(e, {top: true} ) } ></div>
                <div draggable="true" className="resize-area resize-left" onDrag={ e => resize(e, {left: true} ) }></div>
                <div draggable="true" className="resize-area resize-bottom" onDrag={ e => resize(e, {bottom: true} ) } ></div>
                <div draggable="true" className="resize-area resize-right" onDrag={ e => resize(e, {right: true} ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-bottomright" onDrag={ e => resize(e, {bottom: true, right: true} ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-bottomleft" onDrag={ e => resize(e, {bottom: true, left: true} ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-topright" onDrag={ e => resize(e, {top: true, right: true} ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-topleft" onDrag={ e => resize(e, {top: true, left: true} ) }></div>

                <PanelHeaderContainer draggable="true" onDrag={e => handleDrag(e, styleData, setStyleData)} onDragEnd={e => handleDragEnd(e, styleData, setStyleData)}>
                    <PanelHeader>{data.name}</PanelHeader>
                    <Button onClick={e => handleClose(e)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </PanelHeaderContainer>
                {content}

            </div>
        </article>
    );

}

const panelClass = `
    absolute
    border
    border-black
    bg-white
    shadow-xl
    z-50
    overflow-y-hidden
    overflow-x-hidden
`