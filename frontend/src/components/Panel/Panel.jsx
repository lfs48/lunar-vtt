import React, {useState, useEffect} from 'react';
import { merge } from 'lodash';
import { Button, TextButton, TextButton1 } from '../../styles/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { editPanel, viewPanel, closePanel, selectPanel } from '../../store/reducers/UI/panelsReducer';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';
import ClassViewPanel from './Class/ClassPanel';
import { DraggableArea, PanelFooterContainer, PanelHeader, PanelHeaderContainer } from './styles';
import {throttle} from 'lodash';
import FeaturePanel from './Feature/FeaturePanel';
import entityTypes, { getEntityModalType } from '../../util/types/entityTypes';
import EditClassPanel from './Class/EditClassPanel';
import { createClass, editClass } from '../../store/reducers/entities/classesReducer';
import EditFeaturePanel from './Feature/EditFeaturePanel';
import { editFeature } from '../../store/reducers/entities/featuresReducer';
import { editSubclass } from '../../store/reducers/entities/subclassesReducer';
import EditSubclassPanel from './Subclass/EditSubclassPanel';
import SubclassPanel from './Subclass/SubclassPanel';
import { openModal } from '../../store/reducers/UI/modalReducer';
import { modalTypes } from '../../util/types/modalTypes';

const handleDragStart = ({event, styleData, setStyleData, id, dispatch}) => {
    event.preventDefault();
    if (!styleData.dragging) {
        const newState = merge({}, styleData);
        newState.dragPrevX = event.pageX;
        newState.dragPrevY = event.pageY;
        newState.dragging = true;
        setStyleData(newState);
    }
    handleSelect({
        event: event,
        id: id,
        dispatch: dispatch
    });
};

const _handleDrag = ({event, styleData, setStyleData, id, dispatch}) => {
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
        handleDragStart({
            event: event, 
            styleData: styleData, 
            setStyleData: setStyleData,
            id: id,
            dispatch: dispatch
        });
    }
};

const handleDrag = throttle(_handleDrag, 15);

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

const getContent = (panelType, edit, data, inputs, setInputs, height) => {
    switch(panelType) {
        case(entityTypes.CLASSES):
            if (edit) {
                return <EditClassPanel 
                    dndClass={data} 
                    inputs={inputs}
                    setInputs={setInputs}
                    preloadedInputs={initialInputs(data, panelType, true)} 
                    styleData={{height: height}}
                />;
            } else {
                return <ClassViewPanel 
                    dndClass={data} 
                    styleData={{height: height}}
                />;
            }
        case(entityTypes.FEATURES):
            if (edit) {
                return <EditFeaturePanel 
                    inputs={inputs} 
                    setInputs={setInputs} 
                    preloadedInputs={initialInputs(data, panelType, true)}
                    styleData={{height: height}}
                    />
            } else {
                return <FeaturePanel feature={data} styleData={{height: height}}/>;
            }
        case(entityTypes.SUBCLASSES):
            if (edit) {
                return <EditSubclassPanel
                    inputs={inputs} 
                    setInputs={setInputs} 
                    preloadedInputs={initialInputs(data, panelType, true)}
                    styleData={{height: height}}
                />
            } else {
                return <SubclassPanel subclass={data} styleData={{height: height}} />
            }
    }
}

const initialInputs = (data, panelType) => {
    switch(panelType) {
        case(entityTypes.CLASSES):
            return({
                name: data.name,
                description: data.description,
                hitDie: data.hitDie,
                armor: data.armor,
                weapons: data.weapons,
                tools: data.tools,
                saves: data.saves,
                skills: data.skills,
                equipment: data.equipment,
                tableCols: data.tableCols,
                features: data.features,
                spellcasting: data.spellcasting
            });
        case(entityTypes.FEATURES):
            return({
                name: data.name,
                description: data.description,
                featureType: data.featureType,
                sourceModel: data.sourceModel
            });
        case(entityTypes.SUBCLASSES):
            return({
                name: data.name,
                description: data.description,
                spellcasting: data.spellcasting,
                features: data.features
            })
    }
}

const saveType = (panelType) => {
    switch(panelType) {
        case(entityTypes.CLASSES):
            return editClass.type;
        case(entityTypes.FEATURES):
            return editFeature.type;
        case(entityTypes.SUBCLASSES):
            return editSubclass.type
    }
}

const handleEdit = ({event, entity, entityType, dispatch}) => {
    event.preventDefault();
    const action = {
        type: openModal.type,
        payload: {
            modalType: getEntityModalType(entityType),
            data: {
                entity: entity,
                edit: true
            }
        }
    };
    dispatch(action);
};

const handleSave = ({event, inputs, id, panelType, dispatch}) => {
    event.preventDefault();
    const action = {
        type: saveType(panelType),
        payload: {
            id: id,
            formData: inputs
        }
    };
    const otherAction = {
        type: viewPanel.type,
        payload: {
            id: id
        }
    };
    dispatch(action);
    dispatch(otherAction);
};

const handleCancel = ({event, id, dispatch}) => {
    event.preventDefault();
    const action = {
        type: viewPanel.type,
        payload: {
            id: id
        }
    };
    dispatch(action);
}

const handleClose = ({event, styleData, setStyleData, dispatch, id}) => {
    event.preventDefault();
    const newState = merge({}, styleData);
    newState.stage = 1;
    newState.opacity = 0;
    newState.left -= 100;
    setStyleData(newState);
    setTimeout( () => {
        const action = {
            type: closePanel.type,
            payload: {
                id: id
            }
        };
        dispatch(action);
    }, 350);
};


const handleSelect = ({event, id, dispatch}) => {
    event.preventDefault();
    const action = {
        type: selectPanel.type,
        payload: {
            id: id
        }
    };
    dispatch(action);
}

export default function Panel({data, panelType, edit}) {

    const dispatch = useDispatch();

    const {user} = useSelector( (state) => ({
        user: state.session.user
    }));

    const [styleData, setStyleData] = useState({
        left: Math.random() * (window.innerWidth - 1400),
        top: Math.random() * (window.innerHeight - 610 ),
        width: 800,
        height: 600,
        minHeight: 50,
        minWidth: 200,
        dragging: false,
        dragPrevX: null,
        dragPrevY: null,
        stage: 0,
        opacity: 0,
    });

    const [inputs, setInputs] = useState(initialInputs(data, panelType, false));

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

    return(

        <article 
            className={`${panelClass} 
            ${ styleData.stage < 2 ? "transition-all duration-700 ease-in-out" : ""} `} 
            style={styleData}
            onClick={(e) => handleSelect({
                event: e,
                id: data._id,
                dispatch: dispatch
            })}
        >

            <PanelHeaderContainer 
                draggable="true" 
                onDrag={e => handleDrag({
                    event: e,
                    styleData: styleData, 
                    setStyleData: setStyleData,
                    id: data._id,
                    dispatch: dispatch
                })} 
                onDragEnd={e => handleDragEnd(e, styleData, setStyleData)}
            >
                <PanelHeader className="font-fancy flex items-center">
                    <i className={`mr-2 fas fa-${data.icon}`}></i>
                    <p>{data.name}</p>
                </PanelHeader>
                <div>
                    <Button 
                        onClick={e => handleClose({
                            event: e,
                            styleData: styleData,
                            setStyleData: setStyleData,
                            dispatch: dispatch,
                            id: data._id
                        })}>
                        <i className="ml-4 fas fa-times text-lg"/>
                    </Button>
                </div>
            </PanelHeaderContainer>

            {getContent(panelType, edit, data, inputs, setInputs, user.gm ? styleData.height - 100 : styleData.height -50)}

            {user.gm ?
                <PanelFooterContainer>
                    {edit ? (
                        <>
                        <Button 
                            onClick={e => handleSave({
                                event: e,
                                inputs: inputs,
                                id: data._id,
                                panelType: panelType,
                                dispatch: dispatch
                            })}
                            className="text-green-500"
                        >
                            Save
                        </Button>
                        <Button 
                                onClick={e => handleCancel({
                                event: e,
                                id: data._id,
                                dispatch: dispatch
                                })}
                                className="text-red-500"
                        >
                            Cancel
                        </Button>
                        </>
                    ) : (
                        <Button 
                            onClick={e => handleEdit({
                                event: e,
                                entity: data,
                                entityType: panelType,
                                dispatch: dispatch
                            })}
                        >
                            Edit
                        </Button>
                    )}
                </PanelFooterContainer>
            :<></>}

            <div>

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
    z-40
    overflow-y-hidden
    overflow-x-hidden
    rounded
`