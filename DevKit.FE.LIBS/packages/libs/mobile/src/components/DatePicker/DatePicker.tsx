import { Ref, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { CalendarIcon, SfCalendarIcon } from '@devkit/icons/native';
import {
	DatePickerMode,
	ECalendars,
	FieldValues,
	ICommonFieldProps,
	IDatePickerFieldProps as IDatePickerFieldUtilsProps,
	IDatePickerRangeInputValues,
	calculateAge,
	getIsoDateTime,
	parseIsoDateTime,
	useMask,
	useReactFormController,
} from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { InternalTextField, TextFieldRef } from '../TextField/TextField';
import { CalendarView } from './components/CalendarView';
import { CalendarViewWrapper } from './components/CalendarViewWrapper';
import styles from './date-picker.styles';
import { getDateFormatter, getMask, parse } from './utils';

export type IDatePickerFieldProps<
	TForm extends FieldValues = never,
	TMode extends DatePickerMode = 'single'
> = IDatePickerFieldUtilsProps<TForm, TMode> & {
	/** A flag that changes the background to highlight a change in values. */
	highlighted?: boolean;
	selectedCalendar?: ECalendars;
	onCalendarChange?: (value: ECalendars) => void;
};

// export type ITest = Record<string, any>;

export interface IDatePickerRef {
	focus: () => void;
}

const DatePickerComponent = <TForm extends FieldValues, TMode extends DatePickerMode = 'single'>(
	props: IDatePickerFieldProps<TForm, TMode>,
	ref?: Ref<IDatePickerRef>
) => {
	const inputRef = useRef<TextFieldRef>(null);

	const {
		label,
		isRequired,
		reserveLabelSpacing,
		layoutClassName,
		defaultMonth,
		valueType,
		size,
		format,
		disabled,
		placeholder,
		fromDate,
		toDate,
		variant = 'default',
		isClearable = true,
		isDateOfBirth,
		highlighted,
		readonly,
		viewMode: pickerViewMode = 'days',
		autoSelectTime = true,
		calendars = ['gregorian'],
		selectedCalendar,
		onCalendarChange,
		mode = 'single',
		maxSelectionRangeDays,
	} = props;

	const enableTimeSelection = pickerViewMode === 'days' && (props.enableTimeSelection ?? false);
	const mask = getMask(pickerViewMode, enableTimeSelection);
	const placeHolder = placeholder ?? mask.placeholder;
	const { applyMask } = useMask({ mask: mask.value });
	const isDateOnly = format === 'date-only';
	const dateFormatter = getDateFormatter(pickerViewMode, enableTimeSelection);
	const isIntervalPicker = mode === 'interval';
	const { tw, isRtlLocale, locale } = useMobileUIConfigOptions();

	const [displayBottomSheet, setDisplayBottomSheet] = useState(false);

	const {
		value: tempOriginalValue,
		onChange,
		onBlur: onInputBlur,
		hasErrors,
		formId,
		...fieldProps
	} = useReactFormController<IDatePickerRangeInputValues<string | Date> | Date | string, TForm>(
		props as ICommonFieldProps<IDatePickerRangeInputValues<string | Date> | Date | string, TForm>
	);

	// Single Picker or Interval Picker Start Date
	const originalValue = isIntervalPicker
		? (tempOriginalValue as IDatePickerRangeInputValues<string | Date>)?.startDate
		: (tempOriginalValue as Date | string);
	const value = !originalValue
		? undefined
		: typeof originalValue === 'string'
		? parseIsoDateTime(originalValue)
		: originalValue;
	const formattedValue = value ? dateFormatter(value, { calendar: selectedCalendar, locale }) : undefined;

	// Interval Picker End Date
	const orignalSecondaryValue = isIntervalPicker
		? (tempOriginalValue as IDatePickerRangeInputValues<string | Date>)?.endDate
		: undefined;
	const secondaryValue = !orignalSecondaryValue
		? undefined
		: typeof orignalSecondaryValue === 'string'
		? parseIsoDateTime(orignalSecondaryValue)
		: orignalSecondaryValue;
	const formattedSecondaryValue =
		isIntervalPicker && secondaryValue
			? dateFormatter(secondaryValue, { calendar: selectedCalendar, locale })
			: undefined;

	const parseValue = parse(pickerViewMode, enableTimeSelection);

	const [internalValue, setInternalValue] = useState<string | undefined>(formattedValue);
	const [internalSecondaryValue, setInternalSecondaryValue] = useState<string>();
	const [internalSelectedCalendar, setInternalSelectedCalendar] = useState<ECalendars | undefined>(selectedCalendar);

	useEffect(() => {
		setInternalValue(formattedValue);
	}, [formattedValue]);

	useEffect(() => {
		setInternalSecondaryValue(formattedSecondaryValue);
	}, [formattedSecondaryValue]);

	const ignoreResetValue = useRef(false);

	useImperativeHandle(ref, () => ({
		focus: () => inputRef.current?.focus(),
	}));

	const handlePresentModalPress = useCallback(() => {
		setDisplayBottomSheet(true);
		Keyboard.dismiss();
	}, []);

	const ageLabel = value && internalValue && isDateOfBirth ? `(${calculateAge(value)})` : undefined;

	const onCalendarClose = () => {
		setDisplayBottomSheet(false);
		setTimeout(() => {
			inputRef.current?.blur();
		}, 100);
	};

	return (
		<>
			{variant === 'default' && (
				<InternalTextField
					label={label}
					isRequired={isRequired}
					layoutClassName={layoutClassName}
					reserveLabelSpacing={reserveLabelSpacing}
					formId={formId}
					hasErrors={hasErrors}
					highlighted={highlighted}
					ref={inputRef}
					value={
						isIntervalPicker
							? internalValue
								? `${internalValue ?? ''} - ${internalSecondaryValue ?? ''}`
								: undefined
							: internalValue
					}
					mask={isIntervalPicker ? `${mask.value} - ${mask.value}` : mask.value}
					placeholder={
						isIntervalPicker
							? `${isRtlLocale ? 'من' : 'From'} DD/MM/YYYY - ${isRtlLocale ? 'إلى' : 'To'} DD/MM/YYYY`
							: placeHolder
					}
					// for interval picker currently disabled input entry
					readOnly={readonly}
					size={size}
					isClearable={isClearable}
					showSoftInputOnFocus={false}
					onClearValue={() => {
						onChange(undefined);

						if (!displayBottomSheet) {
							ignoreResetValue.current = true;
						}
					}}
					disabled={disabled}
					endIcon={SfCalendarIcon}
					onIconClick={handlePresentModalPress}
					onChange={(val) => {
						setInternalValue(val);
					}}
					onBlur={() => {
						// for interval picker currently input is readOnly
						if (!ignoreResetValue.current && !isIntervalPicker) {
							if (!internalValue && value) {
								onChange(undefined);
							}

							const newFormattedValue = applyMask(internalValue ?? '').result;

							const { isValid, date: validDate } = parseValue(
								newFormattedValue,
								undefined,
								selectedCalendar,
								internalValue
							);

							if (isValid) {
								if (valueType === 'date') onChange(validDate);
								else onChange(getIsoDateTime(validDate, isDateOnly));
							} else {
								setInternalValue(formattedValue);
							}
						}
						setDisplayBottomSheet(false);
						props.onBlur?.();
						onInputBlur();
					}}
					onFocus={() => {
						ignoreResetValue.current = false;
						setInternalValue(formattedValue);
						setInternalSecondaryValue(formattedSecondaryValue);
						setDisplayBottomSheet(true);
						props.onFocus?.();
						setInternalSelectedCalendar(selectedCalendar);
					}}
					{...fieldProps}
				>
					{ageLabel && <View style={tw`${styles.ageLabel(hasErrors)}`}>{ageLabel}</View>}
				</InternalTextField>
			)}
			{variant === 'iconOnly' && (
				<>
					<Pressable onPress={handlePresentModalPress}>
						<CalendarIcon style={tw`${hasErrors ? 'text-brand-600' : 'text-red-500'}`} />
					</Pressable>
				</>
			)}
			<CalendarViewWrapper
				withModal={variant !== 'staticCalendar'}
				modalProps={{
					isOpen: displayBottomSheet,
					onClose: onCalendarClose,
					enableDynamicSizing: true,
				}}
			>
				<CalendarView
					pickerViewMode={pickerViewMode}
					defaultMonth={value ?? defaultMonth}
					enableTimeSelection={enableTimeSelection}
					currentDate={value}
					currentEndDate={secondaryValue}
					onChange={(newDateValue, calendar, newSecondaryDateValue) => {
						onCalendarChange && calendar && onCalendarChange(calendar);
						setInternalValue(dateFormatter(newDateValue, { calendar: calendar, locale }));

						if (isIntervalPicker) {
							newSecondaryDateValue &&
								setInternalSecondaryValue(dateFormatter(newSecondaryDateValue, { calendar: calendar, locale }));

							const startDate = valueType === 'date' ? newDateValue : getIsoDateTime(newDateValue, isDateOnly);
							const endDate =
								valueType === 'date' ? newSecondaryDateValue : getIsoDateTime(newSecondaryDateValue, isDateOnly);

							onChange({ startDate, endDate });
						} else {
							if (valueType === 'date') onChange(newDateValue);
							else onChange(getIsoDateTime(newDateValue, isDateOnly));
						}

						setDisplayBottomSheet(false);
					}}
					fromDate={fromDate}
					toDate={toDate}
					onCancelSelection={() => setDisplayBottomSheet(false)}
					autoSelectTime={autoSelectTime}
					calendars={calendars}
					selectedCalendar={internalSelectedCalendar}
					onCalendarChange={setInternalSelectedCalendar}
					isIntervalPicker={isIntervalPicker}
					maxSelectionRangeDays={maxSelectionRangeDays}
					hideFooter={variant === 'staticCalendar'}
				/>
			</CalendarViewWrapper>
		</>
	);
};

export const DatePicker = forwardRef(DatePickerComponent) as <
	TForm extends FieldValues,
	TMode extends DatePickerMode = 'single'
>(
	props: IDatePickerFieldProps<TForm, TMode> & { ref?: Ref<IDatePickerRef> }
) => JSX.Element;
