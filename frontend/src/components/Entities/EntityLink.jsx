import React from 'react';
import { useDispatch } from 'react-redux';
import { openPanel } from '../../store/reducers/UI/panelsReducer';
import tw from 'tailwind-styled-components';

export default function EntityLink({entityType, id, children, className=""}) {

    const dispatch = useDispatch();
    
    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const action = {
            type: openPanel.type,
            payload: {
                panelType: entityType,
                id: id
            }
        };
        dispatch(action);
    }

    return(
        <StyledLink 
            onClick={(e) => handleClick(e)}
            className={className}
        >
            {children}
        </StyledLink>
    )

}

const StyledLink = tw.p`
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