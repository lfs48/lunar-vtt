import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { Button, Input } from '../../../styles/components';

export function CreateFormWrapper({form, handleCreate, handleCancel}) {

    const [creating, setCreating] = useState(false);

    const _handleCreate = () => {
        handleCreate();
        _handleCancel();
    }

    const _handleCancel = () => {
        setCreating(false);
        handleCancel();
    }

    return(
        creating ? (
            <FormContainer>
                {form}
                <Button
                    className="mx-2"
                    onClick={() => _handleCancel()}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => _handleCreate()}
                >
                    Create
                </Button>
            </FormContainer>
        ) : (
            <FormButton
                onClick={() => setCreating(true)}
            >
                {`Add`}
            </FormButton>
        )
    )
}

const FormContainer = tw.div`
    flex
    p-2
`

const FormButton = tw(Button)`
    bg-gray-300
    px-2
    py-1
    rounded
`