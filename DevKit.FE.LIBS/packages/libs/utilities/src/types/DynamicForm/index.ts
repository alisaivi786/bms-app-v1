import React, { FC } from 'react';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { FormValidationModeYup, FormValidationModeZod, ReactForm } from '../../hooks/useReactForm';
import {
	CapsuleButtonFieldProps,
	CheckBoxFieldProps,
	DatePickerMode,
	DropdownProps,
	ICommonFieldProps,
	IDatePickerFieldStringProps,
	IDatePickerRangeProps,
	INumberFieldProps,
	INumberRangeFieldProps,
	ITextFieldProps,
	MultipleSelectDropdownProps,
	RadioButtonFieldProps,
	RadioCardFieldProps,
} from '../Forms';
import { PrimitiveKeys, StringAndNumberKeys } from '../shared-types';

export interface ICommonSchema<TForm extends FieldValues> {
	field: Path<TForm>;
	isEditable?: boolean;
	isHidden?: boolean;
	onRenderNoneEditable?: (props: { value: string }) => React.ReactNode;
	parentField?: Path<TForm>;
	onParentChange?: <TFieldSchema extends FormFieldSchema<TForm>>(
		parentValue: PathValue<TForm, Path<TForm>> | undefined,
		schema: TFieldSchema,
		form: ReactForm<TForm>
	) => TFieldSchema;
}

type OmitCommon<T> = Omit<T, 'onChange' | 'value' | 'errors' | 'type'>;

export type TDynamicTextField<TForm extends FieldValues> = OmitCommon<ITextFieldProps<TForm>> & {
	type: 'text';
};

export type TDynamicTextAreaField<TForm extends FieldValues> = OmitCommon<ITextFieldProps<TForm>> & {
	type: 'text-area';
};

export type TDynamicPasswordField<TForm extends FieldValues> = OmitCommon<ITextFieldProps<TForm>> & {
	type: 'password';
};

export type TDynamicNumberField<TForm extends FieldValues> = OmitCommon<INumberFieldProps<TForm>> & {
	type: 'number';
};

export type TDynamicDropdownField<TForm extends FieldValues> = OmitCommon<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	DropdownProps<any, any, TForm, undefined>
> & {
	type: 'drop-down';
};

export type TDynamicMultiSelectDropdownField<TForm extends FieldValues> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	OmitCommon<DropdownProps<any, any, TForm, undefined>> & {
		type: 'multi-drop-down';
	};

type TDynamicDatePickerField<TForm extends FieldValues> = OmitCommon<
	IDatePickerFieldStringProps<TForm, DatePickerMode>
> & {
	type: 'date-picker';
};

type TDynamicDatePickerRangeField<TForm extends FieldValues> = OmitCommon<IDatePickerRangeProps<TForm>> & {
	type: 'date-picker-range';
};

export type TSeparator = OmitCommon<ICommonFieldProps<undefined, never>> & {
	type: 'separator';
	columns?: number;
};

export type TCustom<TForm extends FieldValues> = OmitCommon<ICommonFieldProps<unknown, TForm>> & {
	type: 'custom';
	component: FC<OmitCommon<ICommonFieldProps<unknown, TForm>>>;
};

export type TNumberRangeField<TForm extends FieldValues> = OmitCommon<INumberRangeFieldProps<TForm, ''>> & {
	type: 'number-range';
};

export type TRadioCardsField<TForm extends FieldValues> = OmitCommon<RadioCardFieldProps<TForm, number | string>> & {
	type: 'radio-cards';
};

export type TCapsuleButtonsField<TForm extends FieldValues> = OmitCommon<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	CapsuleButtonFieldProps<any, any, TForm>
> & {
	type: 'capsule-buttons';
};

export type TRadioButtonField<TForm extends FieldValues> = OmitCommon<RadioButtonFieldProps<TForm, string>> & {
	type: 'radio-button';
};

export type TCheckboxField<TForm extends FieldValues> = OmitCommon<CheckBoxFieldProps<TForm>> & {
	type: 'checkbox';
};

export type FormFieldSchema<TForm extends FieldValues> = ICommonSchema<TForm> &
	(
		| TDynamicTextField<TForm>
		| TDynamicTextAreaField<TForm>
		| TDynamicPasswordField<TForm>
		| TDynamicNumberField<TForm>
		| TDynamicDropdownField<TForm>
		| TDynamicMultiSelectDropdownField<TForm>
		| TDynamicDatePickerField<TForm>
		| TDynamicDatePickerRangeField<TForm>
		| TNumberRangeField<TForm>
		| TSeparator
		| TCustom<TForm>
		| TRadioCardsField<TForm>
		| TRadioButtonField<TForm>
		| TCheckboxField<TForm>
		| TCapsuleButtonsField<TForm>
	);

export const mapDropDown = <
	TForm extends FieldValues,
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined = undefined
>(
	data: ICommonSchema<TForm> & OmitCommon<DropdownProps<TValue, TKey, TForm, TGroupKey>>
) => ({
	type: 'drop-down' as const,
	...(data as unknown as ICommonSchema<TForm> & DropdownProps<TValue, TKey, TForm, TGroupKey>),
});

export const mapMultiSelectDropDownField = <
	TForm extends FieldValues,
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined = undefined
>(
	data: ICommonSchema<TForm> & OmitCommon<MultipleSelectDropdownProps<TValue, TKey, TForm, TGroupKey>>
) => ({
	type: 'multi-drop-down' as const,
	...(data as unknown as ICommonSchema<TForm> & DropdownProps<TValue, TKey, TForm, TGroupKey>),
});

export const mapTextField = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<ITextFieldProps<TForm>>
) => ({
	...data,
	type: 'text' as const,
});

export const mapNumberRangeField = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<INumberRangeFieldProps<TForm, ''>>
) => ({
	...data,
	type: 'number-range' as const,
});

export const mapTextAreaField = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<ITextFieldProps<TForm>>
) => ({
	...data,
	type: 'text-area' as const,
});

export const mapDatePicker = <TForm extends FieldValues, TMode extends DatePickerMode>(
	data: ICommonSchema<TForm> & OmitCommon<IDatePickerFieldStringProps<TForm, TMode>>
) => ({
	type: 'date-picker' as const,
	...data,
});

export const mapDatePickerRange = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<IDatePickerRangeProps<TForm>>
) => ({
	type: 'date-picker-range' as const,
	...data,
});

export const mapNumberField = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<INumberFieldProps<TForm>>
) => ({
	type: 'number' as const,
	...data,
});

export const mapPasswordField = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<ITextFieldProps<TForm>>
) => ({
	type: 'password' as const,
	...data,
});

export const mapSeparatorField = <TForm extends FieldValues>() => {
	const result: ICommonSchema<TForm> & TSeparator = {
		type: 'separator' as const,
		field: undefined as Path<TForm> & undefined,
	};

	return result;
};

export const mapCustomField = <TForm extends FieldValues>({ component }: { component: FC }) => {
	const result: ICommonSchema<TForm> & TCustom<TForm> = {
		type: 'custom' as const,
		field: undefined as Path<TForm> & undefined,
		component,
	};

	return result;
};

export const mapRadioCardsField = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<RadioCardFieldProps<TForm, number | string>>
) => ({
	type: 'radio-cards' as const,
	...data,
});

export const mapRadioButtonField = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<RadioButtonFieldProps<TForm, string>>
) => ({
	type: 'radio-button' as const,
	...data,
});

export const mapCheckBoxField = <TForm extends FieldValues>(
	data: ICommonSchema<TForm> & OmitCommon<CheckBoxFieldProps<TForm>>
) => ({
	...data,
	type: 'checkbox' as const,
});

export const mapCapsuleButtonsField = <TForm extends FieldValues, TValue, TKey extends StringAndNumberKeys<TValue>>(
	data: ICommonSchema<TForm> & OmitCommon<CapsuleButtonFieldProps<TValue, TKey, TForm>>
) => ({
	type: 'capsule-buttons' as const,
	...data,
});

export type FormFieldsSchema<TForm extends FieldValues> = FormFieldSchema<TForm>[];

export type IFormSchema<TForm extends FieldValues> = {
	fields: FormFieldsSchema<TForm>;
	initialValues: TForm;
} & (FormValidationModeZod<TForm> | FormValidationModeYup<TForm>);
