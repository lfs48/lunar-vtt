import { useDispatch } from "react-redux";
import { Button } from "../../styles/components";
import entityTypes from "../../util/types/entityTypes";
import { requestDeleteClass } from "../../store/reducers/entities/classesReducer";
import { closeModal } from "../../store/reducers/UI/modalReducer";
import { requestDeleteSubclass } from "../../store/reducers/entities/subclassesReducer";
import { requestDeleteFeature } from "../../store/reducers/entities/featuresReducer";

export default function DeleteConfirmation({entity, entityType}) {

    const dispatch = useDispatch();

    const handleCancel = () => {
        const action = {
            type: closeModal.type
        };
        dispatch(action);
    };

    const handleConfirm = () => {
        const action = {
            type: getEntityDeleteActionType(entityType),
            payload: {
                id: entity._id
            }
        };
        dispatch(action);
        handleCancel();
    }
    return(
        <div className="bg-white w-1/4 h-1/6 flex flex-col justify-between items-center p-6">
            <h1 className="text-xl font-bold">Delete {entity.name}?</h1>
            <div className="w-full flex justify-between">
                <Button
                    onClick={() => handleCancel()}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => handleConfirm()}
                >
                    Confirm
                </Button>
            </div>
        </div>
    )
}

function getEntityDeleteActionType(entityType) {
    switch(entityType) {
        case(entityTypes.CLASSES):
            return requestDeleteClass.type;
        case(entityTypes.SUBCLASSES):
            return requestDeleteSubclass.type
        case(entityTypes.FEATURES):
            return requestDeleteFeature.type;
    }
}