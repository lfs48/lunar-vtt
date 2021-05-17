import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import tw from 'tailwind-styled-components';
import { Input, DropDown } from '../../styles/components';
import { merge } from 'lodash';

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

export default function FeatureAutocomplete({input, handleInput, className, handleSelect}) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {features} = useSelector( (state) => ({
        features: state.entities.features
    }));

    const filteredFeatures = Object.values(features)
    .filter( (feature) => feature.name.toLowerCase().startsWith(input.toLowerCase()) )
    .map( (feature) => {
        return(
            <FeatureLi 
                key={feature._id}
                onClick={(e) => _handleSelect(e, feature, handleSelect, setDropdownOpen)}
            >
                {feature.name}
            </FeatureLi>
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
                {filteredFeatures}
            </ul>
        </DropDown>
        </div>
    )
}

const FeatureLi = tw.li`
    px-1
    py-0.5
    hover:bg-gray-200
    border-b
    cursor-pointer
`