import React, {useState, useEffect} from 'react';
import { merge } from 'lodash';
import { Button } from '../../styles/components';
import { closePanel, selectPanel } from '../../store/reducers/UI/panelsReducer';
import { useDispatch, useSelector } from 'react-redux';
import ClassViewPanel from '../Entities/Class/Panel/ClassPanel';
import { PanelFooterContainer, PanelHeader, PanelHeaderContainer } from './styles';
import {throttle} from 'lodash';
import FeaturePanel from '../Entities/Features/Panel/FeaturePanel';
import entityTypes, { getEntityModalType } from '../../util/types/entityTypes';
import SubclassPanel from '../Entities/Subclass/Panel/SubclassPanel';
import { openModal } from '../../store/reducers/UI/modalReducer';
import Resize from '../Util/Resize';
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
            newState.top = Math.min(newState.top, window.innerHeight - styleData.height - 7);
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

const handleDrag = throttle(_handleDrag, 10);

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

const getContent = (panelType, data, gm) => {

    const panelClasses = `p-6
    ${gm ? "h-[calc(100%-6rem)]" : "h-[calc(100%-3rem)]"}
    overflow-y-auto
    overflow-x-hidden
    scroll`;

    switch(panelType) {
        case(entityTypes.CLASSES):
                return <ClassViewPanel 
                    dndClass={data} 
                    className={panelClasses}
                />;
        case(entityTypes.FEATURES):
                return <FeaturePanel 
                    feature={data} 
                    className={panelClasses}
                />;
        case(entityTypes.SUBCLASSES):
                return <SubclassPanel 
                    subclass={data} 
                    className={panelClasses} 
                />
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

const handleDelete = ({event, entity, entityType, dispatch}) => {
    event.preventDefault();
    const action = {
        type: openModal.type,
        payload: {
            modalType: modalTypes.DELETE_CONFIRMATION,
            data: {
                entity: entity,
                entityType: entityType
            }
        }
    };
    dispatch(action);
};

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

export default function Panel({data, panelType}) {

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

            {getContent(panelType, data, user.gm)}

            {user.gm ?
                <PanelFooterContainer>
                    <Button 
                        onClick={e => handleDelete({
                            event: e,
                            entity: data,
                            entityType: panelType,
                            dispatch: dispatch
                        })}
                    >
                        Delete
                    </Button>
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
                </PanelFooterContainer>
            :<></>}

            <Resize styleData={styleData} setStyleData={setStyleData}/>

        </article>
    );

}

const panelClass = `
    absolute
    border-2
    border-black
    bg-white
    shadow-xl
    z-40
    rounded
`