import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPanel, togglePanel } from '../../store/reducers/UI/panelsReducer';
import { Button, Input } from '../../styles/components';
import { getCreateEntityActionType, getEntityName} from '../../util/types/entityTypes';
import { SidebarLi, TabHeader } from './styles';

export default function Tab({entityType}) {

    const dispatch = useDispatch();

    const [creating, setCreating] = useState(false);
    const [newName, setNewName] = useState("");

    const {entities, openEntities, user} = useSelector( (state) => ({
        entities: state.entities[entityType],
        openEntities: state.UI.panels.filter( (panel) => panel.panelType === entityType ).map( (panel) => panel.id ),
        user: state.session.user
    }));

    const handleLiClick = (event, id) => {
        event.preventDefault();
        const action = {
            type: openPanel.type,
            payload: {
                panelType: entityType,
                id: id
            }
        };
        dispatch(action);
    }

    const lis = Object.values(entities).map( (entity, i) => {
        return (
            <SidebarLi key={i} open={openEntities.includes(entity._id)} onClick={(e) => handleLiClick(e, entity._id)}>
                {'icon' in entity ?
                    <i class={`fas fa-${entity.icon} mr-2`}></i>
                :<></>}
                {entity.name}
            </SidebarLi>
        )
    });

    const handleCreate = () => {
        const action = {
            type: getCreateEntityActionType(entityType),
            payload: {
                formData: {
                    name: newName
                }
            }
        };
        dispatch(action);
        handleCancelCreate();
    }

    const handleCancelCreate = () => {
        setCreating(false);
        setNewName("");
    }

    return(
        <div>
            <TabHeader>
                {user.gm ?
                    creating ? (
                        <div>
                            <Input
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                className=""
                            >
                            </Input>
                            <Button
                                className="mx-2"
                                onClick={() => handleCancelCreate()}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => handleCreate()}
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
                :<></>}
            </TabHeader>
            <ul>
                {lis}
            </ul>
        </div>
    )
}