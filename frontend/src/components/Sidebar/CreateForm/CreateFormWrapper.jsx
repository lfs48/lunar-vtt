import React, { useState } from 'react';
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
            <div>
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
            </div>
        ) : (
            <Button
                onClick={() => setCreating(true)}
            >
                {`Add`}
            </Button>
        )
    )
}