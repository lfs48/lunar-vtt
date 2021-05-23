import entityTypes, { getCreateEntityActionType } from "../../../util/types/entityTypes";
import { DefaultForm } from "./DefaultForm";
import { CreateSubclassForm } from './CreateSubclassForm';

export function getCreateForm(entityType) {
    switch(entityType) {
        case(entityTypes.SUBCLASSES):
            return <CreateSubclassForm />
        default:
            return <DefaultForm actionType={getCreateEntityActionType(entityType)} />
    }
}