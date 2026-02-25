import React from 'react';
import { FieldValues, FormFieldsSchema, ReactForm } from '@devkit/utilities';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { FormContainer } from '../FormContainer/FormContainer';
import { FormField } from './FormField';

export interface DynamicFormProps<IForm extends FieldValues> {
	/** The Dynamic Form fields object could be any type of the available field's type a normal TextField, DatePicker, Dropdown, etc. */
	fieldsStructure: FormFieldsSchema<IForm>;
	/**	Defines the number of columns to render in each horizontal line and this value will be passed to FormContainer*/
	columnsCount?: number;
	/** Used to pass the form object to handle the field value/validation/submission and more internally by the provided form value, you should be aware if it was added the field value and the onChange function would be ignored! */
	form: ReactForm<IForm>;
	/**	Defines the number of columns to render in each horizontal line for mobile devices and this value will be passed to FormContainer*/
	columnsCountForMobile?: number;
}

function DynamicForm<IForm extends FieldValues>({
	fieldsStructure,
	columnsCount = 1,
	form,
	columnsCountForMobile = 1,
}: DynamicFormProps<IForm>) {
	const { max_sm } = useResponsiveView();

	const columns = max_sm ? columnsCountForMobile : columnsCount;

	return (
		<FormContainer columnsCount={columns}>
			{fieldsStructure.map((fieldSchema, i) => {
				if (!fieldSchema || fieldSchema.isHidden) return <React.Fragment key={i}></React.Fragment>;

				const field = fieldSchema.field;

				return (
					<FormField
						form={form}
						key={`${field as string}-${i}`}
						field={field}
						schema={fieldSchema}
						columnsCount={columns}
					/>
				);
			})}
		</FormContainer>
	);
}

export default DynamicForm;
