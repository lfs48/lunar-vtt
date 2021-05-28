import ClassForm from '../../components/Entities/Class/Form/ClassForm';

export const modalTypes = {
    CLASSFORM: "classForm"
};

export function getModalComponent(modalType, data) {
    switch(modalType) {
        case(modalTypes.CLASSFORM):
            return <ClassForm dndClass={data?.entity} edit={data?.edit}/>
        default:
            return <></>
    }
}