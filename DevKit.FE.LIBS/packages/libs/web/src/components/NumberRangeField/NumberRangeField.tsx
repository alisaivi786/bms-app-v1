'use client';

import { useEffect, useState } from 'react';
import { FieldValues, ICommonFieldProps, INumberRangeFieldProps, Path, useReactFormController } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { FormFieldErrors } from '../FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import { NumberField } from '../TextField';

const NumberRangeField = <TForm extends FieldValues, TValue extends string>(
	props: INumberRangeFieldProps<TForm, TValue>
) => {
	const {
		isRequired,
		label,
		popover,
		popoverVariant,
		maxLength,
		field,
		form,
		layoutClassName,
		reserveLabelSpacing,
		fromPlaceholder,
		toPlaceholder,
		toDecimalPoints,
		fromDecimalPoints,
	} = props;
	const [currentFocus, setCurrentFocus] = useState<'start' | 'end'>();
	const {
		onChange: onStartNumberChange,
		onBlur: onStartNumberBlur,
		errors: startNumberErrors,
		hasErrors: startNumberHasError,
		value: startNumberValue,
		formId,
	} = useReactFormController({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...(props as ICommonFieldProps<number | undefined, any>),
		field: field ? `${field}.startNumber` : undefined,
	});
	const {
		onChange: onEndNumberChange,
		onBlur: onEndNumberBlur,
		errors: endNumberErrors,
		hasErrors: endNumberHasError,
		value: endNumberValue,
	} = useReactFormController({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...(props as ICommonFieldProps<number | undefined, any>),
		field: field ? `${field}.endNumber` : undefined,
	});
	const { isRtlLocale } = useWebUIConfigOptions();

	useEffect(() => {
		if (!currentFocus) {
			form?.validateField(`${field}.endNumber` as Path<TForm>);
			form?.validateField(`${field}.startNumber` as Path<TForm>);
		}
	}, [startNumberValue, endNumberValue, currentFocus]);

	return (
		<FormInputGroup
			layoutClassName={layoutClassName}
			label={label}
			isRequired={isRequired}
			popover={popover}
			popoverVariant={popoverVariant}
			reserveLabelSpacing={reserveLabelSpacing}
			formId={formId}
			hasErrors={startNumberHasError || endNumberHasError}
		>
			<div className="flex items-center flex-1 w-full gap-2">
				<NumberField
					decimalPlaces={fromDecimalPoints}
					hasErrors={!currentFocus && startNumberHasError}
					onBlur={() => {
						setCurrentFocus(undefined);
						onStartNumberBlur();
					}}
					onChange={(v) => {
						setCurrentFocus('start');
						onStartNumberChange(v);
					}}
					maxLength={maxLength}
					value={startNumberValue}
					placeholder={fromPlaceholder ?? `${isRtlLocale ? 'من' : 'From'}`}
				/>
				<NumberField
					decimalPlaces={toDecimalPoints}
					hasErrors={!currentFocus && endNumberHasError}
					onBlur={() => {
						setCurrentFocus(undefined);
						onEndNumberBlur();
					}}
					onChange={(v) => {
						setCurrentFocus('end');
						onEndNumberChange(v);
					}}
					maxLength={maxLength}
					value={endNumberValue}
					placeholder={toPlaceholder ?? `${isRtlLocale ? 'إلى' : 'To'}`}
				/>
			</div>
			<section className={`flex justify-between gap-2 w-full ${startNumberErrors || endNumberErrors ? '' : 'hidden'}`}>
				<div className="flex-1">
					<FormFieldErrors errors={!currentFocus ? startNumberErrors : undefined}></FormFieldErrors>
				</div>
				<div className="flex-1">
					<FormFieldErrors errors={!currentFocus ? endNumberErrors : undefined}></FormFieldErrors>
				</div>
			</section>
		</FormInputGroup>
	);
};

export default NumberRangeField;
