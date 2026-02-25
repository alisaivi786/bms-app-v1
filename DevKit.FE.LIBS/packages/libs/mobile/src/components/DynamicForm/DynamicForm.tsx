import React from 'react';
import { View } from 'react-native';
import { FieldValues, FormFieldsSchema, ReactForm } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './DynamicForm.styles';
import FormField from './FormField';

export interface DynamicFormProps<IForm extends FieldValues> {
	/** The Dynamic Form fields object could be any type of the available field's type a normal TextField, DatePicker, Dropdown, etc. */
	fieldsStructure: FormFieldsSchema<IForm>;
	/**	Defines the number of columns to render in each horizontal line and this value will be passed to FormContainer*/
	columnsCount?: number;
	/** Used to pass the form object to handle the field value/validation/submission and more internally by the provided form value, you should be aware if it was added the field value and the onChange function would be ignored! */
	form: ReactForm<IForm>;
}

const DynamicForm = <IForm extends FieldValues>({
	fieldsStructure,
	form,
	columnsCount = 1,
}: DynamicFormProps<IForm>) => {
	const { tw } = useMobileUIConfigOptions();

	const visibleFields = fieldsStructure.filter((field) => field && !field.isHidden);

	return (
		<View style={tw`${styles.dynamicFormWrapperStyles}`}>
			{Array.from({ length: Math.ceil(visibleFields.length / columnsCount) }).map((_, rowIndex) => {
				const rowFields = visibleFields.slice(rowIndex * columnsCount, (rowIndex + 1) * columnsCount);

				return (
					<View key={`row-${rowIndex}`} style={tw` ${styles.getWrapperStyle(columnsCount)}`}>
						{rowFields.map((fieldSchema, colIndex) => (
							<View key={`${fieldSchema.field}-${colIndex} `} style={tw`${styles.getFieldStyle(columnsCount)}`}>
								<FormField form={form} field={fieldSchema.field} schema={fieldSchema} />
							</View>
						))}
					</View>
				);
			})}
		</View>
	);
};

export default DynamicForm;
