import entityTypes from "../../../util/types/entityTypes";
import DefaultTab from "./DefaultTab";
import SubclassesTab from "./SubclassesTab"

export function getEntityTab(entityType) {
    switch(entityType) {
        case(entityTypes.SUBCLASSES):
            return <SubclassesTab />
        default:
            return <DefaultTab entityType={entityType} />
    }
}