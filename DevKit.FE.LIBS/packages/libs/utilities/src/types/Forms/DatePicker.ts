import { FieldValues } from 'react-hook-form';
import { ECalendars } from '../../common/DateUtils/hijri';
import { ICommonFieldProps } from './Common';
import { IDatePickerRangeInputValues } from './DatePickerRange';

export type CalendarViewMode = 'days' | 'months' | 'years' | 'time';

export type DatePickerMode = 'single' | 'interval' | undefined;

interface IBaseDatePickerFieldProps<
	TForm extends FieldValues,
	TValue extends Date | string | IDatePickerRangeInputValues<Date | string>
> extends ICommonFieldProps<TValue, TForm> {
	/** If true, the input field will be highlighted(selected)*/
	autoFocus?: boolean;
	/** The start date of the DatePicker calendar, if it is provided the dates before will be disabled */
	fromDate?: Date;
	/** The end date of the DatePicker calendar, if it is provided the dates after will be disabled */
	toDate?: Date;
	/** The view variant of the DatePicker, the default value means the normal DatePicker input field, if the icon is selected the input field will be hide*/
	variant?: 'default' | 'iconOnly' | 'staticCalendar';
	/** If true, the time picker will be added */
	enableTimeSelection?: boolean;
	/** The default month of the first DatePicker view */
	defaultMonth?: Date;
	/** If true, a calculated value of the input will be added next to the date 'date Of Birth' */
	isDateOfBirth?: boolean;
	/** If true, a clear icon and functionality will be added */
	isClearable?: boolean;
	/** Which view to show */
	viewMode?: CalendarViewMode;
	/** Should auto select Time */
	autoSelectTime?: boolean;
	/** Array to choose hijri, gregorian or both calendars  */
	calendars?: ECalendars[];
}

export interface IDatePickerFieldStringProps<TForm extends FieldValues, TMode extends DatePickerMode>
	extends IBaseDatePickerFieldProps<TForm, TMode extends 'interval' ? IDatePickerRangeInputValues<string> : string> {
	mode?: TMode;
	/** The type of the returned value */
	valueType?: 'string';
	/**
	 * date only to set the format for the string to be date only as YYYY-MM-DD or iso format depend on the global date utils config
	 * @default undefined
	 */
	format?: 'date-only';
	readonly?: boolean;
	/** Max possible selection range (Days)  */
	maxSelectionRangeDays?: TMode extends 'interval' ? number : undefined;
}

export interface IDatePickerFieldDateProps<TForm extends FieldValues, TMode extends DatePickerMode>
	extends IBaseDatePickerFieldProps<TForm, TMode extends 'interval' ? IDatePickerRangeInputValues<Date> : Date> {
	mode?: TMode;
	valueType: 'date';
	format?: undefined;
	readonly?: boolean;
	/** Max possible selection range (Days)  */
	maxSelectionRangeDays?: TMode extends 'interval' ? number : undefined;
}

export type IDatePickerFieldProps<TForm extends FieldValues, TMode extends DatePickerMode> =
	| IDatePickerFieldStringProps<TForm, TMode>
	| IDatePickerFieldDateProps<TForm, TMode>;
