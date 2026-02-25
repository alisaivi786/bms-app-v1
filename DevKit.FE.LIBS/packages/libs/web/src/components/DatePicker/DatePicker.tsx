import { Ref, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
	autoUpdate,
	flip,
	limitShift,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useTransitionStyles,
} from '@floating-ui/react';
import { hide } from '@floating-ui/react-dom';
import { CalendarIcon, SfCalendarIcon } from '@devkit/icons/web';
import {
	DatePickerMode,
	ECalendars,
	FieldValues,
	ICommonFieldProps,
	IDatePickerFieldProps as IDatePickerFieldUtilsProps,
	IDatePickerRangeInputValues,
	calculateAge,
	getDateUtilsConfig,
	getIsoDateTime,
	getTzEndOfDay,
	parseIsoDateTime,
	useMask,
	useReactFormController,
} from '@devkit/utilities';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { FormInputGroup } from '../FormInputGroup';
import { InternalTextField, TextFieldRef } from '../TextField/TextField';
import ResponsiveRenderViewContainer from './ResponsiveRenderViewContainer';
import { CalendarView } from './components/CalendarView';
import styles from './date-picker.styles';
import { getDateFormatter, getMask, parse } from './utils';

export type IDatePickerFieldProps<
	TForm extends FieldValues = never,
	TMode extends DatePickerMode = 'single'
> = IDatePickerFieldUtilsProps<TForm, TMode> & {
	onInvalidDateError?: (error: string | undefined) => void;
	/** A flag that changes the background to highlight a change in values. */
	highlighted?: boolean;
	selectedCalendar?: ECalendars;
	onCalendarChange?: (value: ECalendars) => void;
};

export interface IDatePickerRef {
	focus: () => void;
}

const DatePickerComponent = <TForm extends FieldValues, TMode extends DatePickerMode = 'single'>(
	props: IDatePickerFieldProps<TForm, TMode>,
	ref?: Ref<IDatePickerRef>
) => {
	const inputRef = useRef<TextFieldRef>(null);

	const { dateFormat, dateTimeFormat } = getDateUtilsConfig();

	const {
		label,
		isRequired,
		reserveLabelSpacing,
		popover,
		popoverVariant,
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
		autoSelectTime = false,
		calendars = ['gregorian'],
		selectedCalendar,
		onCalendarChange,
		mode = 'single',
		maxSelectionRangeDays,
		testId,
		status,
	} = props;

	const enableTimeSelection = pickerViewMode === 'days' && (props.enableTimeSelection ?? false);
	const calenderViewRef = useRef<HTMLDivElement>(null);
	const mask = getMask(pickerViewMode, enableTimeSelection);
	const placeHolder = placeholder ?? mask.placeholder;
	const { applyMask, extractValue } = useMask({ mask: mask.value });
	const isDateOnly = format === 'date-only';
	const dateFormatter = getDateFormatter(pickerViewMode, enableTimeSelection);
	const isIntervalPicker = mode === 'interval';
	const { isRtlLocale } = useWebUIConfigOptions();

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

	const getParsedDateValue = (
		value: string | Date | IDatePickerRangeInputValues<string | Date> | undefined,
		isStartDate = true
	) => {
		const originalValue = isIntervalPicker
			? isStartDate
				? (value as IDatePickerRangeInputValues<string | Date>)?.startDate
				: (value as IDatePickerRangeInputValues<string | Date>)?.endDate
			: (value as Date | string);

		if (!originalValue) return undefined;

		const parsed = typeof originalValue === 'string' ? parseIsoDateTime(originalValue) : originalValue;

		return parsed;
	};

	const value = getParsedDateValue(tempOriginalValue);

	const formattedValue = value ? dateFormatter(value, { calendar: selectedCalendar }) : undefined;

	//#region  Interval Picker End Date
	const secondaryValue = getParsedDateValue(tempOriginalValue, false);

	const formattedSecondaryValue =
		isIntervalPicker && secondaryValue ? dateFormatter(secondaryValue, { calendar: selectedCalendar }) : undefined;
	//#endregion

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

	const [isFocused, setIsFocused] = useState(false);
	const ignoreResetValue = useRef(false);

	const { sm } = useResponsiveView();

	useEffect(() => {
		const onFocus = () => {
			ignoreResetValue.current = false;
			setInternalValue(formattedValue);
			setInternalSecondaryValue(formattedSecondaryValue);
			setIsFocused(true);
			props.onFocus?.();
			setInternalSelectedCalendar(selectedCalendar);
		};

		const onBlur = () => {
			setIsFocused(false);
			props.onBlur?.();
		};

		if (inputRef?.current) {
			inputRef.current.addEventListener('focus', onFocus);
			inputRef.current.addEventListener('blur', onBlur);
		}

		return () => {
			if (inputRef?.current) {
				inputRef.current.removeEventListener('focus', onFocus);
				inputRef.current.removeEventListener('blur', onBlur);
			}
		};
	}, [inputRef?.current, formattedValue, formattedSecondaryValue]);

	useImperativeHandle(ref, () => ({
		focus: () => inputRef.current?.focus(),
	}));

	const { x, y, refs, strategy, context, middlewareData } = useFloating({
		open: isFocused,
		onOpenChange: (isOpen: boolean) => {
			if (variant === 'iconOnly' && !isOpen) {
				setIsFocused(isOpen);
			}
		},
		placement: 'bottom-start',
		middleware: [
			offset({
				mainAxis: 4,
			}),
			flip(),
			shift({
				limiter: limitShift(),
			}),
			hide(),
		],
		whileElementsMounted: autoUpdate,
	});

	const { isMounted, styles: floatingStyles } = useTransitionStyles(context);

	const dismiss = useDismiss(context);

	const click = useClick(context, {
		event: 'mousedown',
		toggle: false,
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

	const isElementOutOfScope = useMemo(() => middlewareData.hide?.referenceHidden, [middlewareData]);

	const calendarViewStyles = useMemo(() => {
		return {
			position: strategy,
			top: y ?? 0,
			left: x ?? 0,
			width: 'max-content',
			...floatingStyles,
		};
	}, [strategy, floatingStyles, x, y]);

	const ageLabel = value && internalValue && isDateOfBirth ? `(${calculateAge(value)})` : undefined;

	const onCalendarClose = () => {
		setIsFocused(false);
		inputRef.current?.blur();
	};

	const calendarViewComponent = (
		<div onMouseDown={(e) => e.preventDefault()}>
			<ResponsiveRenderViewContainer
				pickerViewMode={pickerViewMode}
				enableTimeSelection={enableTimeSelection}
				calendarViewStyles={calendarViewStyles}
				calenderViewRef={calenderViewRef}
				getFloatingProps={getFloatingProps}
				isElementOutOfScope={isElementOutOfScope}
				isFocused={isFocused}
				isMounted={isMounted}
				onCalendarClose={onCalendarClose}
				setFloating={refs.setFloating}
				isMobile={sm}
				multiCalendar={calendars && calendars.length > 1}
				isIntervalPicker={isIntervalPicker}
			>
				<CalendarView
					pickerViewMode={pickerViewMode}
					defaultMonth={value ?? defaultMonth}
					enableTimeSelection={enableTimeSelection}
					currentDate={value}
					currentEndDate={secondaryValue}
					onChange={(newDateValue, calendar, newSecondaryDateValue) => {
						onCalendarChange && calendar && onCalendarChange(calendar);
						setInternalValue(extractValue(dateFormatter(newDateValue, { calendar: calendar })));

						// in case on onChange in Interval picker, only update the intervalValue state.
						if (isIntervalPicker) {
							newSecondaryDateValue &&
								setInternalSecondaryValue(extractValue(dateFormatter(newSecondaryDateValue, { calendar: calendar })));
						} else {
							if (valueType === 'date') onChange(newDateValue);
							else onChange(getIsoDateTime(newDateValue, isDateOnly));

							if (variant === 'iconOnly') {
								setIsFocused(false);
							} else {
								setTimeout(() => {
									inputRef.current?.blur();
								});
							}
						}
					}}
					fromDate={fromDate}
					toDate={toDate}
					onCancelSelection={() => {
						if (isIntervalPicker) {
							// in case of interval picker reset the interval values
							setInternalValue(formattedValue);
							setInternalSecondaryValue(formattedSecondaryValue);
						}

						if (variant === 'iconOnly') setIsFocused(false);
						else inputRef.current?.blur();
					}}
					autoSelectTime={autoSelectTime}
					calendars={calendars}
					selectedCalendar={internalSelectedCalendar}
					onCalendarChange={setInternalSelectedCalendar}
					isIntervalPicker={isIntervalPicker}
					maxSelectionRangeDays={maxSelectionRangeDays}
					applyDate={(newDateValue, calendar, newSecondaryDateValue) => {
						// currently called only in case of interval picker
						onCalendarChange && calendar && onCalendarChange(calendar);
						setInternalValue(extractValue(dateFormatter(newDateValue, { calendar: calendar })));
						newSecondaryDateValue &&
							setInternalSecondaryValue(extractValue(dateFormatter(newSecondaryDateValue, { calendar: calendar })));
						const startDate = valueType === 'date' ? newDateValue : getIsoDateTime(newDateValue, isDateOnly);
						const tempEndDateReference = newSecondaryDateValue ?? getTzEndOfDay(newDateValue);
						const endDate =
							valueType === 'date' ? tempEndDateReference : getIsoDateTime(tempEndDateReference, isDateOnly);

						onChange({ startDate, endDate });
						setTimeout(() => {
							inputRef.current?.blur();
						});
					}}
				/>
			</ResponsiveRenderViewContainer>
		</div>
	);

	return (
		<>
			{variant === 'default' && (
				<FormInputGroup
					label={label}
					isRequired={isRequired}
					popover={popover}
					popoverVariant={popoverVariant}
					layoutClassName={layoutClassName}
					reserveLabelSpacing={reserveLabelSpacing}
					formId={formId}
					hasErrors={hasErrors}
					highlighted={highlighted}
				>
					<InternalTextField
						testId={testId}
						ref={inputRef}
						status={status}
						value={isIntervalPicker ? `${internalValue ?? ''} - ${internalSecondaryValue ?? ''}` : internalValue}
						mask={isIntervalPicker ? `${mask.value} - ${mask.value}` : mask.value}
						placeholder={
							isIntervalPicker
								? `${isRtlLocale ? 'من' : 'From'} DD/MM/YYYY - ${isRtlLocale ? 'إلى' : 'To'} DD/MM/YYYY`
								: placeHolder
						}
						// for interval picker currently disabled input entry
						readOnly={readonly || sm || isIntervalPicker}
						size={size}
						isClearable={isClearable}
						hasErrors={hasErrors}
						onClearValue={() => {
							onChange(undefined);

							if (!isFocused) {
								ignoreResetValue.current = true;
							}
						}}
						disabled={disabled}
						endIcon={SfCalendarIcon}
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

							if (!ignoreResetValue.current && isIntervalPicker) {
								// in case of interval picker reset the interval values
								setInternalValue(formattedValue);
								setInternalSecondaryValue(formattedSecondaryValue);
							}

							onInputBlur();
						}}
						floatingDivRef={refs.setReference}
						getFloatingReferenceProps={getReferenceProps}
						{...fieldProps}
					>
						{calendarViewComponent}
						{ageLabel && (
							<div
								className={styles.ageLabel(hasErrors, disabled)}
								style={{
									marginInlineStart: `${(enableTimeSelection ? dateTimeFormat.length : dateFormat.length) * 11}px`,
								}}
							>
								{ageLabel}
							</div>
						)}
					</InternalTextField>
				</FormInputGroup>
			)}
			{variant === 'iconOnly' && (
				<>
					<CalendarIcon
						className="w-6 h-6 cursor-pointer nj-text-brand"
						onClick={() => {
							setIsFocused(true);
						}}
					/>
					{calendarViewComponent}
				</>
			)}
		</>
	);
};

export const DatePicker = forwardRef(DatePickerComponent) as <
	TForm extends FieldValues,
	TMode extends DatePickerMode = 'single'
>(
	props: IDatePickerFieldProps<TForm, TMode> & { ref?: Ref<IDatePickerRef> }
) => JSX.Element;
