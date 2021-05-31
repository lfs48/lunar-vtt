import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFeature, editFeature } from '../../../../store/reducers/entities/featuresReducer';
import { ClearInput, Input, TextArea } from '../../../../styles/components';
import { handleInput } from '../../../../util/functions/utilFunctions';
import ModalFooter from '../../../Modal/ModalFooter';
import Select from '../../../Util/Select';
import { FormContainer, Field, Label } from '../../styles';

const featureTypeOptions = ['Action', 'Bonus Action', 'Reaction', 'Passive', 'Triggered', 'Other'];
const sourceTypeOptions = ['DndClass', 'Subclass', 'Race', 'Background', 'Feat'];

export default function FeatureForm({feature=null, edit=false}) {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        featureType: "Action",
        sourceModel: "DndClass",
        sourceName: "",
        sources: []
    });

    useEffect( () => {
        if (edit) {
            setInputs(feature);
        }
    }, []);

    const handleSave = () => {
        const action = {
            type: edit ? editFeature.type: createFeature.type,
            payload: {
                id: feature?._id,
                formData: inputs
            }
        };
        dispatch(action);
    }

    return(
        <FormContainer className="w-[60rem] h-2/3">
            <div className="p-6 grid grid-cols-4 h-[calc(100%-3rem)] gap-x-4">
                <Field className="col-span-2">
                    <Label>Name </Label>
                    <Input
                        type="text"
                        value={inputs.name}
                        onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    ></Input>
                </Field>
                <Field>
                    <Label>Type </Label>
                    <Select 
                        optionList={featureTypeOptions}
                        field={'featureType'}
                        state={inputs}
                        setState={setInputs}
                    />
                </Field>
                <Field>
                    <Label>Source </Label>
                    <Select 
                        optionList={sourceTypeOptions}
                        field={'sourceModel'}
                        state={inputs}
                        setState={setInputs}
                    />
                </Field>
                <Field className="flex flex-col col-span-4 row-span-6">
                    <Label>Description </Label>
                    <TextArea
                        type="text"
                        value={inputs.description}
                        onChange={e => handleInput(e, 'description', inputs, setInputs)}
                        className="h-full"
                    ></TextArea>
                </Field>
            </div>
            <ModalFooter
                handleSave={() => handleSave()}
            />
        </FormContainer>
    )
}