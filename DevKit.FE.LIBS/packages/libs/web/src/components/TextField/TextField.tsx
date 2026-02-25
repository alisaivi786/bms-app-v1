'use client';

import { DebouncedFunc, isNil } from 'lodash';
import debounce from 'lodash/debounce';
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { ForwardedRef, Ref } from 'react';
import {
	FieldValues,
	ICommonFieldProps,
	INumberFieldProps,
	ITextFieldProps,
	normalizeArabicDigits,
	useMask,
	useReactFormController,
} from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { FormFieldErrors } from '../FormFieldErrors/FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import InputComponent from './InputComponent';
import styles from './TextField.styles';

export type ITextFieldBaseProps<TForm extends FieldValues = never> = (
	| ITextFieldProps<TForm>
	| INumberFieldProps<TForm>
) & {
	children?: ReactNode;
	getFloatingReferenceProps?: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>;
	floatingDivRef?: React.LegacyRef<HTMLDivElement>;
};

type TextFieldBaseType = <TForm extends FieldValues>(
	props: ITextFieldProps<TForm> & { ref?: Ref<TextFieldRef> }
) => JSX.Element;

type NumberFieldBaseType = <TForm extends FieldValues>(
	props: INumberFieldProps<TForm> & { ref?: Ref<TextFieldRef> }
) => JSX.Element;

type InternalFieldBaseType = <TForm extends FieldValues>(
	props: ITextFieldProps<TForm> & {
		children?: ReactNode;
		getFloatingReferenceProps?: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>;
		floatingDivRef?: React.LegacyRef<HTMLDivElement>;
	} & { ref?: Ref<TextFieldRef> }
) => JSX.Element;

export type TextFieldRef = Pick<
	HTMLInputElement | HTMLTextAreaElement,
	'focus' | 'blur' | 'addEventListener' | 'removeEventListener'
>;

const TextFieldBase = <TForm extends FieldValues>(
	props: ITextFieldBaseProps<TForm>,
	ref: ForwardedRef<TextFieldRef>
) => {
	const {
		disabled = false,
		label,
		placeholder,
		suffix,
		prefix,
		maxLength,
		mask,
		maskReverse,
		directionForInput,
		placeholderDir,
		noCopy,
		noPaste,
		type = 'text',
		regex,
		isRequired,
		showCharactersCounter,
		autoFill,
		layoutClassName,
		popover,
		popoverVariant,
		isClearable = false,
		debounceTimeInMilliseconds = 0,
		description,
		endIcon,
		size = 'medium',
		startIcon,
		onClearValue: clearFunction = undefined,
		readOnly = false,
		rotateEndIconOnFocus = false,
		alwaysShowClearIcon = false,
		onFocus,
		onIconClick,
		keepFocus = false,
		children,
		reserveLabelSpacing,
		floatingDivRef,
		getFloatingReferenceProps,
		highlighted,
		onPaste,
		inputMode,
		testId,
		status,
		convertArabicDigitsToEnglish = false,
	} = props;
	const { onChange, onBlur, value, hasErrors, errors, formId } = useReactFormController(
		props as ICommonFieldProps<string | number, TForm>
	);

	const { isRtlLocale } = useWebUIConfigOptions();
	const { applyMask, extractValue } = useMask({ mask, reverse: maskReverse });

	const [isFocused, setIsFocused] = useState(false);
	const [enteredValueLength, setEnteredValueLength] = useState(0);

	const debounceHandler = useRef<DebouncedFunc<(newValue: string | number | undefined) => void>>();
	const unmaskedValueRef = useRef<string | number | undefined>(undefined);
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	const decimalPlaces = type === 'number' ? (props as INumberFieldProps<TForm>).decimalPlaces : undefined;

	useEffect(() => {
		debounceHandler.current = debounce((newValue) => {
			onChange(newValue);
		}, debounceTimeInMilliseconds);

		return () => debounceHandler.current?.cancel();
	}, []);

	useEffect(() => {
		const onFocus = () => {
			setIsFocused(true);
		};
		const onBlur = () => {
			setIsFocused(false);
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
	}, [inputRef?.current]);

	useEffect(() => {
		if (unmaskedValueRef.current !== value) {
			updateInputValue(value, true);
			unmaskedValueRef.current = value;
		}
	}, [value]);

	const dir = directionForInput ?? (isRtlLocale ? 'rtl' : 'ltr');

	useImperativeHandle(ref, () => inputRef.current as TextFieldRef, []);

	const getChangeValue = (value: string | number | undefined, position = 0) => {
		let newPosition: number | undefined = position;
		let newValue = value;

		if (mask && !isNil(value)) {
			const { newPosition: maskedPosition, result } = applyMask(String(value), position);

			newValue = result;
			newPosition = maskedPosition;
		}

		return {
			newValue: newValue?.toString() ?? '',
			newPosition,
		};
	};

	const normalizeIfNeeded = (s: string) => (convertArabicDigitsToEnglish ? normalizeArabicDigits(s) : s);

	const onValueChange = (nextValue: string | number | undefined) => {
		const newValue = (nextValue ?? '').toString().trimStart();

		if (!!regex && !regex.test(newValue)) return;

		// Handle Empty value
		if (newValue === '') {
			return undefined;

			// Handle Numbers
		} else if (type === 'number') {
			const numberValue = Number(newValue);

			if (!isNaN(numberValue)) {
				return numberValue;
			}

			return undefined;

			// Handle String
		} else {
			return newValue;
		}
	};

	const updateInputValue = (newValue: string | number | undefined, bypassPositionCheck?: boolean) => {
		if (inputRef.current) {
			const position = inputRef.current.selectionEnd ?? 0;

			const { newValue: value, newPosition } = getChangeValue(newValue, position);

			setEnteredValueLength(value.length);
			inputRef.current.value = value;

			if (newPosition !== undefined && isFocused && !bypassPositionCheck) {
				inputRef.current.selectionEnd = newPosition;
			}
		}
	};

	const onInternalValueChange = (currentValue: string | undefined) => {
		const newValue = (currentValue ?? '').trimStart();
		const normalizedValue = normalizeIfNeeded(newValue);
		let unmaskedValue: string | number | undefined = normalizedValue;

		if (mask) {
			unmaskedValue = extractValue(applyMask(normalizedValue).result);
		}

		const resetValue = () => {
			if (inputRef.current) {
				inputRef.current.value = String(value ?? '');
				unmaskedValueRef.current = String(value ?? '');
			}
		};

		unmaskedValue = normalizeIfNeeded(unmaskedValue);

		if (
			type === 'number' &&
			!regex &&
			unmaskedValue &&
			!decimalPlaces &&
			!/^[0-9\u0660-\u0669\u06F0-\u06F9]*$/.test(unmaskedValue)
		) {
			resetValue();

			return;
		}

		if (
			type === 'number' &&
			!regex &&
			unmaskedValue &&
			decimalPlaces === 2 &&
			!/^[0-9\u0660-\u0669]*(\.[0-9\u0660-\u0669]{0,2})?$/.test(unmaskedValue)
		) {
			resetValue();

			return;
		}

		if (
			type === 'number' &&
			!regex &&
			unmaskedValue &&
			decimalPlaces === 4 &&
			!/^[0-9\u0660-\u0669]*(\.[0-9\u0660-\u0669]{0,4})?$/.test(unmaskedValue)
		) {
			resetValue();

			return;
		}

		if (!!regex && !regex.test(unmaskedValue)) {
			resetValue();

			return;
		}

		unmaskedValue = onValueChange(unmaskedValue);
		unmaskedValueRef.current = unmaskedValue;

		updateInputValue(normalizedValue);
		debounceHandler.current?.(unmaskedValue);
	};

	const onClearValue = () => {
		debounceHandler.current?.cancel();

		if (inputRef.current) {
			inputRef.current.value = '';
		}
		const unmaskedValue = onValueChange(undefined);

		unmaskedValueRef.current = unmaskedValue;
		onChange(unmaskedValue);
		updateInputValue(undefined);
		clearFunction?.();
	};

	const handleOnBlur = () => {
		if (inputRef.current && type !== 'password' && type !== 'number') {
			const untrimmedValueLength = inputRef.current.value?.length ?? 0;
			const trimmed = inputRef.current.value?.trim();

			if (untrimmedValueLength !== trimmed.length) onInternalValueChange(trimmed);
		}
		onBlur?.();
	};

	return (
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
			<div
				className={styles.mainContainer(size)}
				ref={floatingDivRef}
				{...getFloatingReferenceProps?.()}
				data-testid={testId}
			>
				<InputComponent
					{...{
						inputRef,
						disabled,
						placeholder,
						maxLength,
						noCopy,
						noPaste,
						onPaste,
						type,
						suffix,
						prefix,
						autoFill,
						hasErrors,
						onFocus,
						onBlur: handleOnBlur,
						onClearValue,
						isClearable,
						size,
						startIcon,
						endIcon,
						readOnly,
						onIconClick,
						rotateEndIconOnFocus,
						alwaysShowClearIcon,
						dir,
						placeholderDir,
						onChange: onInternalValueChange,
						isFocused: isFocused || keepFocus,
						formId,
						highlighted,
						mask,
						maskReverse,
						inputMode,
						defaultValue: getChangeValue(value).newValue,
						decimalPlaces,
						status,
					}}
				/>
				{children}
			</div>
			<div className={styles.footerContainer(!!description || !!errors)}>
				{errors ? (
					<FormFieldErrors errors={errors} />
				) : (
					description && <p className={styles.description}>{description}</p>
				)}
				{type === 'text-area' && showCharactersCounter && maxLength && (
					<div className={styles.counterClassNames(hasErrors)}>{`Count ${enteredValueLength}/${maxLength}`}</div>
				)}
			</div>
		</FormInputGroup>
	);
};

const TextFieldWithRef = forwardRef(TextFieldBase) as TextFieldBaseType;

const NumberFieldWithRef = forwardRef(TextFieldBase) as NumberFieldBaseType;

const InternalFieldWithRef = forwardRef(TextFieldBase) as InternalFieldBaseType;

export const TextField = forwardRef(function TextField(props, ref?) {
	return <TextFieldWithRef {...props} ref={ref} />;
}) as TextFieldBaseType;

export const NumberField = forwardRef(function NumberField(props, ref?) {
	return <NumberFieldWithRef type="number" {...props} ref={ref} />;
}) as NumberFieldBaseType;

export const InternalTextField = forwardRef(function NumberField(props, ref?) {
	return <InternalFieldWithRef {...props} ref={ref} />;
}) as InternalFieldBaseType;
