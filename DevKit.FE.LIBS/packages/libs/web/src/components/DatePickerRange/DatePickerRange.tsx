import { useCallback, useMemo, useRef } from 'react';
import {
	FieldValues,
	ICommonFieldProps,
	IDatePickerRangeInputValues,
	IDatePickerRangeProps,
	addMilliseconds,
	addSeconds,
	getIsoDateTime,
	getNow,
	getTzEndOfDay,
	getTzEndOfMonth,
	getTzEndOfYear,
	getTzTimeStates,
	getTzTodayDate,
	isAfter,
	parseIsoDateTime,
	useReactFormController,
} from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { DatePicker, IDatePickerRef } from '../DatePicker/DatePicker';
import { FormFieldErrors } from '../FormFieldErrors/FormFieldErrors';
import FormInputGroup from '../FormInputGroup/FormInputGroup';

export const DatePickerRange = <TForm extends FieldValues>(props: IDatePickerRangeProps<TForm>) => {
	const endDatePickerRef = useRef<IDatePickerRef>(null);

	const {
		layoutClassName,
		valueType = 'string',
		label,
		isRequired,
		popover,
		popoverVariant,
		maxStartDate,
		minStartDate,
		maxEndDate,
		minEndDate,
		enableTimeSelection = false,
		reserveLabelSpacing,
		fromPlaceholder,
		toPlaceholder,
		viewMode,
		autoSelectTime,
		disabled,
	} = props;

	const {
		onChange: originalOnChangeStartDate,
		onBlur: onBlurStartDate,
		value: originalStartDate,
		errors: startDateErrors,
		hasErrors: startDateHasErrors,
		onSetError: onSetErrorStartDate,
	} = useReactFormController({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...(props as ICommonFieldProps<string | Date | undefined, any>),
		errors: props.startDateErrors,
		hasErrors: props.startDateHasErrors,
		field: props.field ? `${props.field}.startDate` : undefined,
	});

	const isReactForm = !!props.field && !!props.form;

	const {
		onChange: originalOnChangeEndDate,
		onBlur: onBlurEndDate,
		value: originalEndDate,
		errors: endDateErrors,
		hasErrors: endDateHasErrors,
		onSetError: onSetErrorEndDate,
		formId,
	} = useReactFormController({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...(props as ICommonFieldProps<string | Date | undefined, any>),
		errors: props.endDateErrors,
		hasErrors: props.endDateHasErrors,
		field: props.field ? `${props.field}.endDate` : undefined,
	});
	const { isRtlLocale } = useWebUIConfigOptions();

	const startDate = useMemo(() => {
		const startDateValue = isReactForm ? originalStartDate : props.value?.startDate;

		if (valueType === 'string') {
			return parseIsoDateTime(startDateValue as string | undefined) as Date | undefined;
		} else {
			return startDateValue as Date | undefined;
		}
	}, [originalStartDate]);

	const endDate = useMemo(() => {
		const endDateValue = isReactForm ? originalEndDate : props.value?.endDate;

		if (valueType === 'string') {
			return parseIsoDateTime(endDateValue as string | undefined) as Date | undefined;
		} else {
			return endDateValue as Date | undefined;
		}
	}, [originalEndDate]);

	const onChangeStartDate = useCallback(
		(value: undefined | Date) => {
			if (valueType === 'string') {
				originalOnChangeStartDate(getIsoDateTime(value));
			} else {
				originalOnChangeStartDate(value);
			}
		},
		[originalOnChangeStartDate]
	);

	const onChangeEndDate = useCallback(
		(value: undefined | Date) => {
			if (valueType === 'string') {
				originalOnChangeEndDate(getIsoDateTime(value));
			} else {
				originalOnChangeEndDate(value);
			}
		},
		[originalOnChangeEndDate]
	);

	const onChange = useCallback(
		(value: undefined | IDatePickerRangeInputValues<Date>) => {
			if (props.onChange) {
				if (valueType === 'string') {
					props?.onChange({
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						startDate: getIsoDateTime(value?.startDate) as any,
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						endDate: getIsoDateTime(value?.endDate) as any,
					});
				} else {
					props?.onChange({
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						endDate: value?.endDate as any,
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						startDate: value?.startDate as any,
					});
				}
			}
		},
		[props.onChange]
	);

	return (
		<FormInputGroup
			layoutClassName={layoutClassName}
			label={label}
			isRequired={isRequired}
			popover={popover}
			popoverVariant={popoverVariant}
			reserveLabelSpacing={reserveLabelSpacing}
			formId={formId}
			hasErrors={startDateHasErrors || endDateHasErrors}
		>
			<div className="flex items-center flex-1 w-full gap-2">
				<DatePicker
					onInvalidDateError={onSetErrorStartDate}
					value={startDate}
					hasErrors={startDateHasErrors}
					valueType="date"
					onBlur={onBlurStartDate}
					fromDate={minStartDate}
					viewMode={viewMode}
					toDate={maxStartDate}
					enableTimeSelection={enableTimeSelection}
					onChange={(v) => {
						const startValue = v;
						const endValue = endDate ? getTzEndOfDay(endDate) : v;

						const endDateStillValid = !startValue || (startValue && endValue && isAfter(endValue, startValue));

						if (isReactForm) {
							onChangeStartDate?.(startValue);
							onChangeEndDate?.(endDateStillValid ? endDate : undefined);
						} else {
							onChange({
								startDate: startValue,
								endDate: endDateStillValid ? endDate : undefined,
							});
						}

						if (startValue) {
							endDatePickerRef?.current?.focus();
						}
					}}
					defaultMonth={getTzTodayDate()}
					placeholder={fromPlaceholder ?? `${isRtlLocale ? 'من' : 'From'} DD/MM/YYYY`}
					autoSelectTime={autoSelectTime}
					disabled={disabled}
				/>
				<DatePicker
					onInvalidDateError={onSetErrorEndDate}
					onBlur={onBlurEndDate}
					hasErrors={endDateHasErrors}
					valueType="date"
					viewMode={viewMode}
					value={endDate}
					fromDate={minEndDate ?? startDate}
					toDate={maxEndDate}
					enableTimeSelection={enableTimeSelection}
					onChange={(v) => {
						const getEndOfMonthOrYear = (v: Date) => {
							return viewMode === 'years' ? getTzEndOfYear(v) : getTzEndOfMonth(v);
						};
						let endValue =
							v && !enableTimeSelection
								? viewMode && (viewMode === 'months' || viewMode === 'years')
									? getEndOfMonthOrYear(v)
									: getTzEndOfDay(v)
								: v;

						if (v && getTzTimeStates(v).seconds === 0 && enableTimeSelection) {
							endValue = addSeconds(v, 59);
							endValue = addMilliseconds(endValue, 999);
						}

						if (isReactForm) {
							onChangeEndDate?.(endValue);
						} else {
							onChange({
								startDate: startDate,
								endDate: endValue,
							});
						}
					}}
					defaultMonth={getTzEndOfDay(minEndDate ?? startDate ?? getNow())}
					placeholder={toPlaceholder ?? `${isRtlLocale ? 'إلى' : 'To'} DD/MM/YYYY`}
					autoSelectTime={autoSelectTime}
					disabled={disabled}
				/>
			</div>
			<section className={`flex justify-between gap-1 w-full ${startDateErrors || endDateErrors ? '' : 'hidden'}`}>
				<div className="flex-1">
					<FormFieldErrors errors={startDateErrors}></FormFieldErrors>
				</div>
				<div className="flex-1">
					<FormFieldErrors errors={endDateErrors}></FormFieldErrors>
				</div>
			</section>
		</FormInputGroup>
	);
};
