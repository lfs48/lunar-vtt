import ClassForm from '../../components/Entities/Class/Form/ClassForm';
import DeleteConfirmation from '../../components/Entities/DeleteConfirmation';
import FeatureForm from '../../components/Entities/Features/Form/FeatureForm';
import SubclassForm from "../../components/Entities/Subclass/Form/SubclassForm";

export const modalTypes = {
    CLASSFORM: "classForm",
    FEATUREFORM: "featureForm",
    SUBCLASSFORM: "subclassForm",
    DELETE_CONFIRMATION: "deleteEntity"
};

export function getModalComponent(modalType, data) {
    switch(modalType) {
        case(modalTypes.CLASSFORM):
            return <ClassForm dndClass={data?.entity} edit={data?.edit}/>
        case(modalTypes.FEATUREFORM):
            return <FeatureForm feature={data?.entity} edit={data?.edit}/>
        case(modalTypes.SUBCLASSFORM):
            return <SubclassForm subclass={data?.entity} edit={data?.edit}/>
        case(modalTypes.DELETE_CONFIRMATION):
            return <DeleteConfirmation entity={data?.entity} entityType={data?.entityType} />
        default:
            return <></>
    }
}