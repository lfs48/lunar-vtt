import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllClassesRequested } from '../../store/reducers/entities/classesReducer';

export default function Wrapper({children}) {

    const dispatch = useDispatch();

    useEffect( () => {

        const action = {
            type: fetchAllClassesRequested.type
        };
        dispatch(action);

    }, []);

    return(
        <>{children}</>
    )
}