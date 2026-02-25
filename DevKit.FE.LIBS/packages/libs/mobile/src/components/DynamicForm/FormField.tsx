import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { FieldValues, FormFieldSchema, Path, ReactForm } from '@devkit/utilities';
import { CapsuleButton } from '../CapsuleButton';
import { Checkbox } from '../Checkbox';
import { DatePicker } from '../DatePicker';
import Dropdown from '../Dropdown/Dropdown';
import { MultiSelectDropdown } from '../MultiSelectDropdown';
import { RadioButtonGroup } from '../RadioButton';
import { RadioCard } from '../RadioCard';
import { useFormFieldsRefs } from './FormFieldsRefsContext';
import { KeyboardAvoidingNumberField } from './KeyboardAvoidingNumberField';
import { KeyboardAvoidingTextField } from './KeyboardAvoidingTextField';
import { useFieldSchemaUpdate } from './hooks/useFieldSchemaUpdate';

interface Props<IFormFields extends FieldValues> {
	field: Path<IFormFields>;
	schema: FormFieldSchema<IFormFields>;
	form: ReactForm<IFormFields>;
}

const FormField = <IFormFields extends FieldValues>(props: Props<IFormFields>) => {
	const { field, form } = props;
	const formFieldsRefs = useFormFieldsRefs();
	const fieldRef = useRef<View>(null);

	const schema = useFieldSchemaUpdate({ schema: props.schema, form });

	const { type, isEditable } = schema;

	// Register field ref for scroll-to-error functionality
	useEffect(() => {
		if (formFieldsRefs && field) {
			formFieldsRefs.registerFieldRef(field as string, fieldRef);
		}

		return () => {
			if (formFieldsRefs && field) {
				formFieldsRefs.unregisterFieldRef(field as string);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [field]);

	if (isEditable === false) {
		return <></>;
	}

	const renderFieldComponent = () => {
		if (type === 'text' || type === 'password') {
			return <KeyboardAvoidingTextField {...schema} form={form} field={field} />;
		} else if (type === 'number') {
			return <KeyboardAvoidingNumberField {...schema} form={form} field={field} />;
		} else if (type === 'text-area') {
			return <KeyboardAvoidingTextField {...schema} form={form} field={field} type="text-area" />;
		} else if (type === 'drop-down') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return <Dropdown<any, any, IFormFields, any> {...schema} form={form} field={field} />;
		} else if (type === 'date-picker') {
			return <DatePicker {...schema} form={form} field={field} />;
		} else if (type === 'date-picker-range') {
			return <Text>To be implemented</Text>;
		} else if (type === 'multi-drop-down') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return <MultiSelectDropdown<any, any, IFormFields, any> {...schema} form={form} field={field} />;
		} else if (type === 'separator') {
			return <Text>To be implemented</Text>;
		} else if (type === 'number-range') {
			return <Text>To be implemented</Text>;
		}
		// else if (type === 'custom') {
		// 	return <schema.component {...schema} form={form} field={field} />;
		// }
		else if (type === 'radio-cards') {
			return <RadioCard {...schema} form={form} field={field} />;
		} else if (type === 'radio-button') {
			return <RadioButtonGroup {...schema} form={form} field={field} />;
		} else if (type === 'checkbox') {
			return <Checkbox {...schema} form={form} field={field} />;
		} else if (type === 'capsule-buttons') {
			return <CapsuleButton {...schema} form={form} field={field} />;
		} else {
			return null;
		}
	};

	const component = renderFieldComponent();

	if (!component) {
		return <></>;
	}

	return <View ref={fieldRef}>{component}</View>;
};

export default FormField;
