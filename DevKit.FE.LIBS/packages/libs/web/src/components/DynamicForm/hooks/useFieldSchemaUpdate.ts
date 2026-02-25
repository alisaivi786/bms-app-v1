import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useState } from 'react';
import { FieldValues, FormFieldSchema, ReactForm } from '@devkit/utilities';

export const useFieldSchemaUpdate = <IFormFields extends FieldValues>({
	form,
	schema,
}: {
	form: ReactForm<IFormFields>;
	schema: FormFieldSchema<IFormFields>;
}) => {
	const { parentField, onParentChange } = schema;
	const isDependOnParent = parentField && !!onParentChange;
	const [newSchema, setNewSchema] = useState(schema);
	const watchedParent = isDependOnParent ? form.watchValues(parentField) : undefined;

	useEffect(() => {
		if (schema.onParentChange && schema.parentField) {
			const newSchemaState = schema.onParentChange(watchedParent, cloneDeep(schema), form);

			setNewSchema(newSchemaState);
		}
	}, [watchedParent]);

	return isDependOnParent ? newSchema : schema;
};
