'use client';

import { FieldValues, FormFieldSchema, Path, ReactForm, logger } from '@devkit/utilities';
import { Checkbox } from '../Checkbox';
import { DatePicker } from '../DatePicker';
import { DatePickerRange } from '../DatePickerRange';
import { Dropdown, MultiSelectDropdown } from '../Dropdown';
import { NumberRangeField } from '../NumberRangeField';
import { RadioButtonGroup } from '../RadioButton';
import { RadioCard } from '../RadioCard';
import { NumberField, TextField } from '../TextField/TextField';
import FormNonEditableField from './FormNonEditableField';
import { useFieldSchemaUpdate } from './hooks/useFieldSchemaUpdate';

interface Props<IFormFields extends FieldValues> {
	field: Path<IFormFields>;
	schema: FormFieldSchema<IFormFields>;
	form: ReactForm<IFormFields>;
	columnsCount?: number;
}

export function FormField<IFormFields extends FieldValues>(props: Props<IFormFields>) {
	const { field, form, columnsCount } = props;

	const schema = useFieldSchemaUpdate({ schema: props.schema, form });

	const { type, isEditable } = schema;

	if (isEditable === false) {
		const value = form.watchValues(field);

		return <FormNonEditableField schema={schema} fieldValue={value} />;
	}

	if (type === 'text' || type === 'password') {
		return <TextField {...schema} form={form} field={field} />;
	} else if (type === 'number') {
		return <NumberField {...schema} form={form} field={field} />;
	} else if (type === 'text-area') {
		return <TextField {...schema} form={form} field={field} type="text-area" />;
	} else if (type === 'drop-down') {
		return (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<Dropdown<any, any, IFormFields> {...schema} form={form} field={field} />
		);
	} else if (type === 'date-picker') {
		return <DatePicker {...schema} form={form} field={field} />;
	} else if (type === 'date-picker-range') {
		return <DatePickerRange {...schema} form={form} field={field} />;
	} else if (type === 'multi-drop-down') {
		return (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<MultiSelectDropdown<any, any, IFormFields> {...schema} form={form} field={field} />
		);
	} else if (type === 'separator') {
		return !!columnsCount && columnsCount > 1 ? (
			<div style={{ gridColumn: `span ${Math.min(columnsCount, schema.columns ?? 1)}` }}></div>
		) : (
			<></>
		);
	} else if (type === 'number-range') {
		return <NumberRangeField {...schema} form={form} field={field} />;
	} else if (type === 'custom') {
		return <schema.component {...schema} form={form} field={field} />;
	} else if (type === 'radio-cards') {
		return <RadioCard {...schema} form={form} field={field} />;
	} else if (type === 'radio-button') {
		return <RadioButtonGroup {...schema} form={form} field={field} />;
	} else if (type === 'checkbox') {
		return <Checkbox {...schema} form={form} field={field} />;
	} else {
		logger.error('unsupported field type', { type: type, field });

		return <></>;
	}
}
