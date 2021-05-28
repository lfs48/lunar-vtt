import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/reducers/UI/modalReducer';
import { Button } from '../../styles/components';
import { FooterContainer } from './styles';

export default function ModalFooter({handleSave}) {

    const dispatch = useDispatch();

    const handleCancel = () => {
        const action = {
            type: closeModal.type,
        };
        dispatch(action);
    };

    const _handleSave = () => {
        handleSave();
        handleCancel();
    }
    
    return(
        <FooterContainer>
            <Button 
                    onClick={() => handleCancel()}
                    className="text-red-500"
            >
                Cancel
            </Button>
            <Button 
                onClick={() => _handleSave()}
                className="text-green-500"
            >
                Save
            </Button>
        </FooterContainer>
    )
}