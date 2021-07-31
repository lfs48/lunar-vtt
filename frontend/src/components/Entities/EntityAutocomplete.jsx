import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';
import { Input, DropDown } from '../../styles/components';

const openList = (event, setOpen) => {
    event.stopPropagation();
    setOpen(true);
    setTimeout( () => {
        window.addEventListener('click', closeList(setOpen));
    }, 0);
}

const closeList = (setOpen) => () => {
    setOpen(false);
    window.removeEventListener('click', closeList(setOpen));
}

const _handleSelect = (event, feature, handleSelect, setOpen) => {
    event.preventDefault();
    event.stopPropagation();
    closeList(setOpen)();
    handleSelect(feature);
}

export default function EntityAutocomplete({entityType, input, handleInput, className="", handleSelect}) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {entities} = useSelector( (state) => ({
        entities: state.entities[entityType]
    }));

    const filteredEntities = Object.values(entities)
    .filter( (entity) => entity.name.toLowerCase().startsWith(input.toLowerCase()) )
    .map( (entity) => {
        return(
            <Li 
                key={entity._id}
                onClick={(e) => _handleSelect(e, entity, handleSelect, setDropdownOpen)}
            >
                {entity.name}
            </Li>
        );
    });

    return(
        <div 
            className="relative inline-block"
            onClick={e => openList(e, setDropdownOpen)}
        >
        <Input
            type="text"
            value={input}
            onChange={e => handleInput(e)}
            className={`${className}`}
        ></Input>
        <DropDown 
            open={dropdownOpen && input.length > 0}
            className=""
        >
            <ul>
                {filteredEntities}
            </ul>
        </DropDown>
        </div>
    )
}

const Li = tw.li`
    px-1
    py-0.5
    hover:bg-gray-200
    border-b
    cursor-pointer
`