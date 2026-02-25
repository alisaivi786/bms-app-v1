import { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';
import React, { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { Ref } from 'react';
import { Text, TextInput, View } from 'react-native';
import {
	FieldValues,
	ICommonFieldProps,
	INumberFieldProps,
	ITextFieldProps,
	normalizeArabicDigits,
	useMask,
	useReactFormController,
} from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import FormFieldErrors from '../FormFieldErrors/FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import InputComponent from './InputComponent';
import styles from './TextField.styles';

export type ITextFieldMobileProps<TForm extends FieldValues> = ITextFieldProps<TForm> & {
	showSoftInputOnFocus?: boolean;
	submitBehavior?: 'submit' | 'blurAndSubmit' | 'newline';
	enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
	returnKeyLabel?: string;
};

export type INumberFieldMobileProps<TForm extends FieldValues> = INumberFieldProps<TForm> & {
	showSoftInputOnFocus?: boolean;
	submitBehavior?: 'submit' | 'blurAndSubmit' | 'newline';
	enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
	returnKeyLabel?: string;
};

export type ITextFieldBaseProps<TForm extends FieldValues = never> =
	| ITextFieldMobileProps<TForm>
	| INumberFieldMobileProps<TForm>;

type TextFieldBaseType = <TForm extends FieldValues>(
	props: ITextFieldMobileProps<TForm> & { ref?: Ref<TextFieldRef> }
) => JSX.Element;

type NumberFieldBaseType = <TForm extends FieldValues>(
	props: INumberFieldMobileProps<TForm> & { ref?: Ref<TextFieldRef> }
) => JSX.Element;

type InternalFieldBaseType = <TForm extends FieldValues>(
	props: ITextFieldMobileProps<TForm> & {
		children?: ReactNode;
	} & { ref?: Ref<TextFieldRef> }
) => JSX.Element;

export type TextFieldRef = Pick<TextInput, 'focus' | 'blur'>;

const TextFieldBase = <TForm extends FieldValues>(
	props: ITextFieldBaseProps<TForm>,
	ref?: React.ForwardedRef<TextFieldRef>
) => {
	const {
		disabled = false,
		label,
		placeholder,
		suffix,
		maxLength,
		returnKeyType,
		onSubmitEditing,
		submitBehavior,
		enterKeyHint,
		returnKeyLabel,
		mask,
		maskReverse,
		directionForInput, // Not used
		placeholderDir, // Not used
		noCopy, // Not used
		noPaste, // Not used
		type = 'text',
		regex,
		isRequired,
		showCharactersCounter,
		autoFill,
		layoutClassName,
		popover, // Not used
		popoverVariant, // Not used
		isClearable = false,
		debounceTimeInMilliseconds = 0,
		description, // Not used
		endIcon,
		size = 'medium',
		startIcon,
		onClearValue: clearFunction = undefined,
		readOnly = false,
		rotateEndIconOnFocus = false,
		alwaysShowClearIcon = false,
		onFocus,
		onBlur: onBlurNative,
		onIconClick,
		keepFocus = false,
		reserveLabelSpacing, // Not used
		highlighted, // Not used
		onPaste, // Not used
		inputMode,
		suffixNode,
		postfixNode,
		variant,
		showSoftInputOnFocus,
		convertArabicDigitsToEnglish = false,
	} = props;

	const { onChange, onBlur, value, hasErrors, errors, formId } = useReactFormController(
		props as ICommonFieldProps<string | number, TForm>
	);

	const { isRtlLocale, tw } = useMobileUIConfigOptions();
	const { applyMask, extractValue } = useMask({ mask, reverse: maskReverse });

	const [isFocused, setIsFocused] = useState(false);
	const [enteredValueLength, setEnteredValueLength] = useState(0);
	// eslint-disable-next-line @typescript-eslint/no-shadow
	const getChangeValue = (value: string | number | undefined, position = 0) => {
		let newPosition: number | undefined = position;
		let newValue = value;

		if (mask && value && typeof value !== 'undefined') {
			const { newPosition: maskedPosition, result } = applyMask(value.toString(), position);

			newValue = result;
			newPosition = maskedPosition;
		}

		return {
			newValue: newValue?.toString() ?? '',
			newPosition,
		};
	};

	const [inputValue, setInputValue] = useState(() => {
		if (value && mask) {
			const { newValue } = getChangeValue(value);

			return newValue;
		}

		return value ?? '';
	});

	const [inputSelection, setInputSelection] = useState<{ start: number; end: number } | undefined>();

	const debounceHandler = useRef<DebouncedFunc<(newValue: string | number | undefined) => void>>();
	const inputRef = useRef<TextInput>(null);

	useImperativeHandle(ref, () => ({
		focus: () => inputRef.current?.focus(),
		blur: () => inputRef.current?.blur(),
	}));

	useEffect(() => {
		debounceHandler.current = debounce((newValue) => {
			onChange(newValue);
		}, debounceTimeInMilliseconds);

		return () => debounceHandler.current?.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const unmaskedInputValue = mask ? extractValue(String(inputValue)) : inputValue;

		if (String(unmaskedInputValue) !== String(value)) {
			updateInputValue(value, true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const dir = directionForInput ?? (isRtlLocale ? 'rtl' : 'ltr');

	const normalizeIfNeeded = (s: string) => (convertArabicDigitsToEnglish ? normalizeArabicDigits(s) : s);

	const onValueChange = (nextValue: string | number | undefined) => {
		const rawValue = (nextValue ?? '').toString().trimStart();
		const newValue = normalizeIfNeeded(rawValue);

		if (!!regex && !regex.test(newValue)) {
			return;
		}

		// Handle Empty value
		if (newValue === '') {
			return undefined;

			// Handle Numbers
		} else if (type === 'number') {
			const numberValue = Number(newValue);

			if (!isNaN(numberValue)) {
				return numberValue;
			} else {
				return undefined;
			}
			// Handle String
		} else {
			return newValue;
		}
	};

	const updateInputValue = (newValue: string | number | undefined, bypassPositionCheck?: boolean) => {
		const position = inputSelection?.end ?? 0;

		// eslint-disable-next-line @typescript-eslint/no-shadow
		const { newValue: value, newPosition } = getChangeValue(newValue, position);

		setEnteredValueLength(value.length);
		setInputValue(value);

		if (newPosition !== undefined && isFocused && !bypassPositionCheck) {
			setInputSelection({ end: newPosition, start: newPosition });
		}
	};

	const onInternalValueChange = (currentValue: string | undefined) => {
		const newValue = normalizeIfNeeded(`${currentValue}`.trimStart());
		let unmaskedValue: string | number | undefined = newValue;

		if (mask) {
			unmaskedValue = extractValue(applyMask(newValue).result);
		}

		const resetValue = () => {
			setInputValue(String(value ?? ''));
		};

		if (type === 'number' && !regex && unmaskedValue) {
			const decimalPlaces = props.type === 'number' && props.decimalPlaces;

			if (!decimalPlaces && !/^[0-9]*$/.test(unmaskedValue)) {
				resetValue();

				return;
			}

			if (decimalPlaces === 2 && !/^\d*$|(?=^.*$)^\d+\.\d{0,2}$/.test(unmaskedValue)) {
				resetValue();

				return;
			}

			if (decimalPlaces === 4 && !/^\d*$|(?=^.*$)^\d+\.\d{0,4}$/.test(unmaskedValue)) {
				resetValue();

				return;
			}

			// Prevent entering multiple leading zeros
			if (Number(unmaskedValue) === 0 && unmaskedValue !== '0') {
				resetValue();

				return;
			}
		} else if (!!regex && !regex.test(unmaskedValue)) {
			resetValue();

			return;
		}

		unmaskedValue = onValueChange(unmaskedValue);
		setInputValue(newValue);

		updateInputValue(newValue);
		debounceHandler.current?.(unmaskedValue);
	};

	const onClearValue = () => {
		debounceHandler.current?.cancel();

		if (inputValue) {
			setInputValue('');
		}
		const unmaskedValue = onValueChange(undefined);

		onChange(unmaskedValue);
		updateInputValue(undefined);
		clearFunction?.();
	};

	const handleOnBlur = (e: object) => {
		if (inputValue && type !== 'password' && type !== 'number') {
			const untrimmedValueLength = `${inputValue}`?.length ?? 0;
			const trimmed = `${inputValue}`?.trim();

			if (untrimmedValueLength !== trimmed?.length) {
				onInternalValueChange(trimmed);
			}
		}

		// Flush any pending debounced changes before blur validation
		debounceHandler.current?.flush();

		onBlur?.();
		onBlurNative?.(e);
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
			<InputComponent
				{...{
					inputRef,
					disabled,
					placeholder,
					maxLength,
					returnKeyType,
					onSubmitEditing,
					submitBehavior,
					enterKeyHint,
					returnKeyLabel,
					noCopy,
					noPaste,
					onPaste,
					type,
					suffix,
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
					setInputSelection,
					inputValue,
					setInputValue,
					setIsFocused,
					suffixNode,
					postfixNode,
					variant,
					showSoftInputOnFocus,
				}}
			/>
			<View style={tw`${styles.footerContainer(!!description || !!errors)}`}>
				{errors ? (
					<FormFieldErrors errors={errors} />
				) : (
					description && <Text style={tw`${styles.description}`}>{description}</Text>
				)}
				{type === 'text-area' && showCharactersCounter && maxLength && (
					<Text style={tw`${styles.counterClassNames(hasErrors)}`}>{`Count ${enteredValueLength}/${maxLength}`}</Text>
				)}
			</View>
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
