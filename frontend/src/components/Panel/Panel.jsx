import React, {useState, useEffect} from 'react';
import { merge } from 'lodash';

export default function Panel({data}) {

    const [styleData, setStyleData] = useState({
        left: Math.max( Math.random() * window.innerWidth - 500, 0),
        top: Math.max( Math.random() * window.innerHeight - 400, 0),
        width: 500,
        height: 400,
        minHeight: 50,
        minWidth: 500,
        dragging: false,
        dragPrevX: null,
        dragPrevY: null,
        stage: 0,
        opacity: 0,
        cursor: 'auto'
    });

    useEffect(() => {
        const newState = merge({}, styleData);
        newState.left += 100;
        newState.opacity = 1;
        newState.stage = 1;
        setStyleData(newState);
        setTimeout( () => {
            const newerState = merge({}, newState);
            newerState.stage = 2;
            setStyleData(newerState);
        }, 720);
    }, []);

    const handleDragStart = (event) => {
        event.preventDefault();
        if (!styleData.dragging) {
            const newState = merge({}, styleData);
            newState.dragPrevX = event.pageX;
            newState.dragPrevY = event.pageY;
            newState.dragging = true;
            setStyleData(newState);
        }
    };

    const handleDrag = (event) => {
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
                newState.top = Math.min(newState.top, window.innerHeight - styleData.height);
                newState.top = Math.max(newState.top, 0);
                newState.dragPrevY = event.pageY;
            }
            newState.cursor = 'move';
            setStyleData(newState);
        } else {
            handleDragStart(event);
        }
    };

    const handleDragEnd = (event) => {
        event.preventDefault();
        const newState = merge({}, styleData);
        newState.dragPrevX = 0;
        newState.dragPrevY = 0;
        newState.dragging = false;
        setStyleData(newState);
    };
    
    return(
        <article draggable="true" className={`absolute cursor-move border border-black bg-white z-50 ${ styleData.stage < 2 ? "transition-all duration-700 ease-in-out" : ""}`} style={styleData}>

            <header draggable="true" onDrag={e => handleDrag(e)} 
            onDragEnd={e => handleDragEnd(e)}>
                {data.name}
            </header>
            <p>Bodytext</p>
        </article>
    );

}