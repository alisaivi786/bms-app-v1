import { FieldValues } from 'react-hook-form';
import { ICommonFieldProps } from './Common';
import { CalendarViewMode } from './DatePicker';

export interface IDatePickerRangeInputValues<TValue extends Date | string> {
	/** The start date of the DatePicker Input, if it is provided the dates before will be disabled */
	startDate?: TValue;
	/** The end date of the DatePicker Input, if it is provided the dates after will be disabled */
	endDate?: TValue;
}

export interface IBaseDatePickerRangeProps<TForm extends FieldValues, TValue extends Date | string>
	extends Omit<ICommonFieldProps<IDatePickerRangeInputValues<TValue>, TForm>, 'errors' | 'hasErrors'> {
	/** The start date of the 'From' DatePicker, if it is provided the dates before will be disabled */
	maxStartDate?: Date;
	/** The end date of the 'From' DatePicker, if it is provided the dates after will be disabled */
	minStartDate?: Date;
	/** The start date of the 'To' DatePicker, if it is provided the dates before will be disabled */
	maxEndDate?: Date;
	/** The end date of the 'To' DatePicker, if it is provided the dates after will be disabled */
	minEndDate?: Date;
	/** If true, the time picker will be added */
	enableTimeSelection?: boolean;
	/** The placeholder for the 'From' DatePicker */
	fromPlaceholder?: string;
	/** The placeholder for the 'To' DatePicker */
	toPlaceholder?: string;
	/** The viewMode defines the default view of the calendar */
	viewMode?: CalendarViewMode;

	/** Should auto select time */
	autoSelectTime?: boolean;
	startDateErrors?: ICommonFieldProps<unknown, never>['errors'];
	endDateErrors?: ICommonFieldProps<unknown, never>['errors'];
	startDateHasErrors?: ICommonFieldProps<unknown, never>['hasErrors'];
	endDateHasErrors?: ICommonFieldProps<unknown, never>['hasErrors'];
}

interface IDatePickerRangeFieldStringProps<TForm extends FieldValues> extends IBaseDatePickerRangeProps<TForm, string> {
	/** The type of the returned value */
	valueType?: 'string';
}

interface IDatePickerFieldRangeDateProps<TForm extends FieldValues> extends IBaseDatePickerRangeProps<TForm, Date> {
	/** The type of the returned value */
	valueType: 'date';
}

export type IDatePickerRangeProps<TForm extends FieldValues> =
	| IDatePickerRangeFieldStringProps<TForm>
	| IDatePickerFieldRangeDateProps<TForm>;
