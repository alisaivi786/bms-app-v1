'use client';
import { useEffect, useState } from 'react';
import { EditPencilIcon } from '@devkit/icons/web';
import { FieldValues, FormFieldsSchema, Path, ReactForm } from '@devkit/utilities';
import { DynamicForm } from '../DynamicForm';
import { FormContainer } from '../FormContainer';
import { FormLabel } from '../FormLabel';

export interface IEditableFormProps<IForm extends FieldValues> {
	form: ReactForm<IForm>;
	fieldsStructure: FormFieldsSchema<IForm>;
	columnsCount?: number;
	disabled?: boolean;
}

function EditableForm<IForm extends FieldValues>(props: IEditableFormProps<IForm>) {
	const { fieldsStructure, form, columnsCount, disabled } = props;
	const [selectedField, setSelectedField] = useState<string | undefined>(undefined);
	const [isBlur, setBlur] = useState(false);

	useEffect(() => {
		if (!selectedField) return;

		const { invalid } = form.getFieldState(selectedField as Path<IForm>);

		if (invalid) return setBlur(false);

		if (isBlur) {
			setSelectedField(undefined);
			setBlur(false);
		}
	}, [selectedField, isBlur, setBlur]);

	return (
		<FormContainer columnsCount={columnsCount}>
			{fieldsStructure
				.map((f) => ({
					...f,
					isEditable: selectedField === f.field && f.isEditable,
					onBlur: () => setBlur(true),
				}))
				.map((f) => {
					return (
						<div className="flex" key={`${f.field}-container`}>
							<div className={selectedField !== f.field ? '' : 'w-full'}>
								<div className="flex">
									{f.label ? <FormLabel>{f.label as string}</FormLabel> : <></>}
									{fieldsStructure.find((fs) => fs.field === f.field)?.isEditable && selectedField !== f.field ? (
										<div
											className={disabled ? 'opacity-20 pointer-events-none' : undefined}
											onClick={() => {
												if (!form.getFieldState(selectedField as typeof f.field).invalid) setSelectedField(f.field);
											}}
										>
											<EditPencilIcon className="cursor-pointer ml-1 h-3" />
										</div>
									) : undefined}
								</div>
								<DynamicForm
									key={`${f.field}-dynamic-form`}
									form={form}
									columnsCount={1}
									fieldsStructure={[{ ...f, label: undefined }]}
								/>
							</div>
						</div>
					);
				})}
		</FormContainer>
	);
}

export default EditableForm;
