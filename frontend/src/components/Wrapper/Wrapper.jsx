import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllBackgrounds } from '../../store/reducers/entities/backgroundsReducer';
import { fetchAllClassesRequested } from '../../store/reducers/entities/classesReducer';
import { fetchAllRaces } from '../../store/reducers/entities/racesReducer';
import { fetchAllSubclasses } from '../../store/reducers/entities/subclassesReducer';

export default function Wrapper({children}) {

    const dispatch = useDispatch();

    useEffect( () => {

        const actions = [
            {
                type: fetchAllClassesRequested.type
            },
            {
                type: fetchAllSubclasses.type
            },
            {
                type: fetchAllRaces.type
            },
            {
                type: fetchAllBackgrounds.type
            }
        ];
        
        actions.forEach( (action) => dispatch(action));

    }, []);

    return(
        <>{children}</>
    )
}