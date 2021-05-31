import React from 'react';
import { useDispatch } from 'react-redux';
import { openPanel } from '../../store/reducers/UI/panelsReducer';
import tw from 'tailwind-styled-components';

export default function EntityLink({entityType, id, children, className="", inline=false}) {

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
            inline={inline}
        >
            {children}
        </StyledLink>
    )

}

const StyledLink = tw.span`
    cursor-pointer
    text-blue-500
    ${p => p.inline ? 
        `
        ` 
    :
        `
            bg-gray-300
            rounded
            px-2
            mr-2
            my-0.5
        `
    }
    font-bold
`