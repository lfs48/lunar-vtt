import { merge, throttle } from 'lodash'; 

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

export default function Resize({styleData, setStyleData}) {
    return(
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
    );
}