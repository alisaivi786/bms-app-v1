import { isNil } from 'lodash';
import { DropdownProps, FieldValues, FormFieldSchema, ICommonFieldProps, formatDate, useMask } from '@devkit/utilities';

interface IFormNonEditableFieldProps<TForm extends FieldValues> {
	schema: FormFieldSchema<TForm>;
	fieldValue: unknown;
}

function FormNonEditableField<TForm extends FieldValues>(props: IFormNonEditableFieldProps<TForm>) {
	const { schema, fieldValue } = props;
	const { type, onRenderNoneEditable } = schema;

	let value;
	let dir: 'ltr' | 'rtl' | undefined = undefined;

	if (type === 'drop-down') {
		const { options, labelKey, valueKey } = schema as DropdownProps<
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			any,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			any,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			any,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			any
		>;

		value = options?.find((opt) => opt[valueKey] === fieldValue)?.[labelKey ?? valueKey];
	} else if (type === 'date-picker') {
		value = formatDate(fieldValue as unknown as Date | undefined);
	} else if (type === 'text') {
		const { mask, directionForInput, suffix } = schema;

		if (!isNil(fieldValue)) {
			value = `${fieldValue}`;
		}

		dir = directionForInput;

		const { applyMask } = useMask({ mask });

		if (mask && value) {
			value = applyMask(value).result;
		}

		if (suffix && value) {
			value = `${suffix} ${value}`;
		}
	} else if (!isNil(fieldValue)) {
		value = `${fieldValue}`;
	}

	if (isNil(value) || value === '') {
		value = <div className="w-10 mt-2 border-t border-solid border-gray-300"></div>;
	}

	return (
		<div className="flex flex-col items-start gap-1 p-0">
			<div className="font-normal text-caption1 text-gray-700">
				{(schema as ICommonFieldProps<unknown, TForm>).label}
			</div>
			<div className="font-medium text-paragraph" {...(dir ? { dir } : {})}>
				{onRenderNoneEditable ? onRenderNoneEditable({ value }) : value}
			</div>
		</div>
	);
}

export default FormNonEditableField;
