import React from 'react';
import { useSelector } from 'react-redux';
import { getModalComponent } from '../../util/types/modalTypes';
import { ModalContainer } from './styles';

export default function Modal({modalType}) {

    const {data} = useSelector( (state) => ({
        data: state.UI.modal.data
    }))
    return(
        <ModalContainer>
            {getModalComponent(modalType, data)}
        </ModalContainer>
    )
}