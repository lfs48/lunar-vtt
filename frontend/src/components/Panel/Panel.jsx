import React, {useState, useEffect} from 'react';
import { merge } from 'lodash';
import { Button } from '../../styles/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { togglePanel, setPanelEdit, setPanelView } from '../../store/reducers/UI/panelsReducer';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';
import ClassViewPanel from './Class/ClassViewPanel';
import { PanelHeader, PanelHeaderContainer } from './styles';
import {throttle} from 'lodash';
import FeaturePanel from './FeaturePanel';
import entityTypes from '../../util/types/entityTypes';
import ClassFormPanel from './Class/ClassFormPanel';

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
    setTimeout( () => {
        setStyleData(newState);
    }, 20);
};

const _resize = (event, dirs, styleData, setStyleData) => {
    event.preventDefault();
    const newState = merge({}, styleData);

    if(event.pageX > 0 && event.pageX < window.innerWidth - 1) {
        if ("right" in dirs) {
            const newWidth = event.pageX - newState.left
            newState.width =  Math.max( newWidth, newState.minWidth );
        } else if ("left" in dirs) {
            const newWidth = newState.width + newState.left - event.pageX;
            newState.width = Math.max(newWidth, newState.minWidth);
            if (newState.width !== styleData.width) {newState.left = event.pageX; }
        }
    }

    if(event.pageY > 0 && event.pageY < window.innerHeight - 1) {
        if ("top" in dirs) {
            const newHeight = newState.height + newState.top - event.pageY;
            newState.height = Math.max(newHeight, newState.minHeight);
            if (newState.height !== styleData.height) {newState.top = event.pageY};
        } else if ("bottom" in dirs) {
            const newHeight = event.pageY - newState.top;
            newState.height = Math.max(newHeight, newState.minHeight);
        }
    }

    setStyleData(newState);
};

const resize = throttle(_resize, 20);

const getInitialWidth = (panelType) => {
    switch(panelType) {
        case(entityTypes.CLASSES):
            return 800;
        case(entityTypes.FEATURES):
            return 500;
    }
}

const getInitialHeight = (panelType) => {
    switch(panelType) {
        case(entityTypes.CLASSES):
            return 600;
        case(entityTypes.FEATURES):
            return 300;
    }
}

const getContent = (panelType, edit, data, styleData) => {
    switch(panelType) {
        case(entityTypes.CLASSES):
            if (edit) {
                const preloadedInputs = {
                    name: data.name,
                    description: data.description,
                    hitdie: data.hitDie,
                    armor: data.armor,
                    weapons: data.weapons,
                    tools: data.tools,
                    saves: data.saves,
                    skills: data.skills,
                    equipment: data.equipment,
                    classTableCols: data.classTableCols,
                    classTable: data.classTable
                }
                return <ClassFormPanel dndClass={data} preloadedInputs={preloadedInputs} styleData={{height: styleData.height - 50}}/>;
            } else {
                return <ClassViewPanel dndClass={data} styleData={{height: styleData.height - 50}}/>;
            }
        case(entityTypes.FEATURES):
            return <FeaturePanel feature={data} styleData={{height: styleData.height - 50}}/>;
    }
}

export default function Panel({data, panelType}) {

    const dispatch = useDispatch();

    const {edit} = useSelector( (state) => ({
        edit: state.UI.panels[panelType][data.id].edit
    }));

    const [styleData, setStyleData] = useState({
        left: Math.random() * (window.innerWidth - getInitialWidth(panelType) - 20),
        top: Math.random() * (window.innerHeight - getInitialHeight(panelType) - 10),
        width: getInitialWidth(panelType),
        height: getInitialHeight(panelType),
        minHeight: 50,
        minWidth: 200,
        dragging: false,
        dragPrevX: null,
        dragPrevY: null,
        stage: 0,
        opacity: 0,
    });

    useEffect(() => {
        const newState = merge({}, styleData);
        newState.left += 100;
        newState.stage = 1;
        newState.opacity = 1;
        setTimeout( () => {
            setStyleData(newState);
        }, 0);
        setTimeout( () => {
            const newerState = merge({}, newState);
            newerState.stage = 2;
            setStyleData(newerState);
        }, 720);
    }, []);

    const handleEdit = (event) => {
        event.preventDefault();
        const action = {
            type: setPanelEdit.type,
            payload: {
                id: data.id,
                panelType: panelType
            }
        };
        dispatch(action);
    };

    const handleSave = (event) => {
        event.preventDefault();
        const action = {
            type: setPanelView.type,
            payload: {
                id: data.id,
                panelType: panelType
            }
        };
        dispatch(action);
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
    
    return(
        <article draggable="true" className={`${panelClass} ${ styleData.stage < 2 ? "transition-all duration-700 ease-in-out" : ""} `} style={styleData}>

            <div className="resize-areas-container">

                <PanelHeaderContainer draggable="true" onDrag={e => handleDrag(e, styleData, setStyleData)} onDragEnd={e => handleDragEnd(e, styleData, setStyleData)}>
                    <PanelHeader className="font-fancy flex items-center">
                        <i className={`mr-2 fas fa-${data.icon}`}></i>
                        <p>{data.name}</p>
                    </PanelHeader>
                    <div>
                        {edit ? (
                            <Button onClick={e => handleSave(e)}>
                            <FontAwesomeIcon icon={faSave} />
                            </Button>
                        ) : (
                            <Button onClick={e => handleEdit(e)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        )}
                        <Button className="ml-2" onClick={e => handleClose(e)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </div>
                </PanelHeaderContainer>
                {getContent(panelType, edit, data, styleData)}

                <div draggable="true" className="resize-area resize-top" onDrag={ e => resize(e, {top: true}, styleData, setStyleData ) } ></div>
                <div draggable="true" className="resize-area resize-left" onDrag={ e => resize(e, {left: true}, styleData, setStyleData ) }></div>
                <div draggable="true" className="resize-area resize-bottom" onDrag={ e => resize(e, {bottom: true}, styleData, setStyleData ) } ></div>
                <div draggable="true" className="resize-area resize-right" onDrag={ e => resize(e, {right: true}, styleData, setStyleData ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-bottomright" onDrag={ e => resize(e, {bottom: true, right: true}, styleData, setStyleData ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-bottomleft" onDrag={ e => resize(e, {bottom: true, left: true}, styleData, setStyleData ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-topright" onDrag={ e => resize(e, {top: true, right: true}, styleData, setStyleData ) }></div>
                <div draggable="true" className="resize-area resize-corner resize-topleft" onDrag={ e => resize(e, {top: true, left: true}, styleData, setStyleData ) }></div>

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