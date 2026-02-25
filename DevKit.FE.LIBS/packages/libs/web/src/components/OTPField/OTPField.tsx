'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, ICommonFieldProps, Path, normalizeArabicDigits, useReactFormController } from '@devkit/utilities';
import { FormFieldErrors } from '../FormFieldErrors/FormFieldErrors';
import styles from './OTPField.styles';

const RE_DIGIT = new RegExp(/^\d+$/);

export type IOtpFieldProps<TForm extends FieldValues = never> = Omit<
	ICommonFieldProps<string, TForm>,
	'label' | 'placeholder' | 'tooltip' | 'isRequired'
> & { autoFocus?: boolean; bypassReset?: boolean };

export const OTPField = <TForm extends FieldValues = never>({
	disabled = false,
	errors,
	field,
	form,
	hasErrors = false,
	onBlur,
	onChange,
	value,
	autoFocus,
	bypassReset = false,
}: IOtpFieldProps<TForm>): JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState<number>(-1);
	const lastInputRef = useRef<HTMLInputElement>(null);
	const reactFormValues = useReactFormController({
		errors,
		field,
		form,
		hasErrors,
		onBlur,
		onChange,
		value,
	});

	const valueItems = useMemo(() => {
		const valueArray = normalizeArabicDigits(reactFormValues.value ?? '').split('');
		const items: Array<string> = [];

		for (let i = 0; i < 4; i++) {
			const char = valueArray[i];

			if (RE_DIGIT.test(char)) {
				items.push(char);
			} else {
				items.push('');
			}
		}

		return items;
	}, [reactFormValues.value]);

	const focusToNextInput = (target: HTMLElement) => {
		const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

		if (nextElementSibling) {
			setCurrentIndex((prevState) => prevState + 1);
			nextElementSibling.focus();
		}
	};

	const focusToPrevInput = (target: HTMLElement) => {
		const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

		if (previousElementSibling) {
			setCurrentIndex((prevState) => prevState - 1);
			previousElementSibling.focus();
		}
	};
	const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		const target = e.target;
		let targetValue = normalizeArabicDigits(target.value.trim());
		const isTargetValueDigit = RE_DIGIT.test(targetValue);

		if (!isTargetValueDigit && targetValue !== '') {
			return;
		}

		const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

		// only delete digit if next input element has no value
		if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
			return;
		}

		targetValue = isTargetValueDigit ? targetValue : ' ';

		const targetValueLength = targetValue.length;

		if (targetValueLength === 1) {
			const normalizedValue = normalizeArabicDigits(reactFormValues.value ?? '');
			const newValue = normalizedValue.substring(0, idx) + targetValue + normalizedValue.substring(idx + 1);

			reactFormValues.onChange(newValue.trim());

			if (!isTargetValueDigit) {
				return;
			}

			focusToNextInput(target);
		} else if (targetValueLength === 4) {
			reactFormValues.onChange(targetValue.trim());

			target.blur();
		}
	};
	const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;
		const target = e.target as HTMLInputElement;

		if (key === 'ArrowRight' || key === 'ArrowDown') {
			e.preventDefault();

			return focusToNextInput(target);
		}

		if (key === 'ArrowLeft' || key === 'ArrowUp') {
			e.preventDefault();

			return focusToPrevInput(target);
		}

		const targetValue = target.value;

		// keep the selection range position
		// if the same digit was typed
		target.setSelectionRange(0, targetValue.length);

		if (e.key !== 'Backspace' || targetValue !== '') {
			return;
		}

		focusToPrevInput(target);
	};

	const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		const { target } = e;

		// keep focusing back until previous input
		// element has value
		target.focus();
		const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

		if (prevInputEl && prevInputEl.value === '') {
			return prevInputEl.focus();
		}

		target.setSelectionRange(0, target.value.length);
	};

	useEffect(() => {
		const allValuesEntered = valueItems.every((el) => el) && valueItems.length === 4;

		if (allValuesEntered && !!(errors || reactFormValues.errors)) {
			lastInputRef.current?.blur();

			if (!bypassReset) {
				reactFormValues.onChange('');
			}
			form?.setFieldTouched(field as Path<TForm>);
		}
	}, [valueItems, errors, reactFormValues.errors, reactFormValues.onChange, reactFormValues, form, field]);

	useEffect(() => {
		if (disabled) {
			lastInputRef.current?.blur();
		}
	}, [disabled]);

	return (
		<div className={styles.OTPContainer}>
			<div className={styles.OTPInputsContainer}>
				{valueItems.map((digit, index) => {
					return (
						<input
							autoFocus={autoFocus && index == 0}
							key={index}
							ref={index === 3 ? lastInputRef : undefined}
							type="text"
							inputMode="numeric"
							autoComplete="one-time-code"
							pattern="\d{1}"
							aria-label="otp"
							maxLength={4}
							value={digit}
							placeholder={index === currentIndex ? '' : 'O'}
							onChange={(e) => inputOnChange(e, index)}
							onKeyDown={inputOnKeyDown}
							onFocus={(e) => {
								setCurrentIndex(index);
								inputOnFocus(e);
							}}
							onBlur={() => {
								setCurrentIndex(-1);
							}}
							className={styles.OTPInput(!!reactFormValues.hasErrors, disabled, index === currentIndex)}
						/>
					);
				})}
			</div>
			<FormFieldErrors errors={reactFormValues.errors}></FormFieldErrors>
		</div>
	);
};
