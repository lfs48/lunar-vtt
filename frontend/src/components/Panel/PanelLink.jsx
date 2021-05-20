import React from 'react';
import { useDispatch } from 'react-redux';
import { openPanel } from '../../store/reducers/UI/panelsReducer';
import tw from 'tailwind-styled-components';

export default function PanelLink({panelType, id, text}) {

    const dispatch = useDispatch();
    
    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const action = {
            type: openPanel.type,
            payload: {
                panelType: panelType,
                id: id
            }
        };
        dispatch(action);
    }

    return(
        <StyledPanelLink onClick={(e) => handleClick(e)}>{text}</StyledPanelLink>
    )

}

const StyledPanelLink = tw.p`
    cursor-pointer
    text-blue-500
    bg-gray-300
    rounded
    inline-block
    px-2
    font-bold
    mr-2
    my-0.5
`