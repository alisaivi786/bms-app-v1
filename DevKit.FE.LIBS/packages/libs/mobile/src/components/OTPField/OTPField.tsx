import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { NativeSyntheticEvent, Platform, Pressable, TextInput, TextInputKeyPressEventData, View } from 'react-native';
import { FieldValues, ICommonFieldProps, normalizeArabicDigits } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './OTPField.styles';
import { transformOTPValue } from './OTPField.utils';

export type OTPFieldRef = {
	focus: () => void;
};

export type IOtpFieldProps<TForm extends FieldValues = never> = Omit<
	ICommonFieldProps<string, TForm>,
	'label' | 'tooltip' | 'isRequired'
> & {
	onCompleteOTP: (otp: string) => void;
	length?: number;
	showSuccess?: boolean;
	convertArabicDigitsToEnglish?: boolean;
	ref: Ref<OTPFieldRef>;
};

const OTPField = <TForm extends FieldValues = never>({
	ref,
	value,
	length = 4,
	placeholder = 'O',
	onCompleteOTP,
	onChange,
	convertArabicDigitsToEnglish = false,
	...props
}: IOtpFieldProps<TForm>) => {
	const inputs = useRef<TextInput[]>([]);
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

	const [values, setValues] = useState<Record<string, string>>(transformOTPValue(length, value));

	useImperativeHandle(
		ref,
		() => ({
			focus: (index?: number) => {
				const nextFocusedIndex = index ?? !value?.length ? 0 : value.length - 1;

				inputs.current[nextFocusedIndex]?.focus();
				setFocusedIndex(nextFocusedIndex);
			},
		}),
		[value]
	);

	useEffect(() => {
		if (value !== Object.values(values).join('')) {
			setValues(transformOTPValue(length, value));

			const nextFocusedIndex = !value?.length ? 0 : value.length - 1;

			inputs.current[nextFocusedIndex]?.focus();
			setFocusedIndex(nextFocusedIndex);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [length, value]);

	const { tw } = useMobileUIConfigOptions();
	const fieldStyles = styles.otpField();

	const normalizeIfNeeded = (s: string) => (convertArabicDigitsToEnglish ? normalizeArabicDigits(s) : s);

	const onChangeText = (text: string) => {
		// Handle entire OTP paste
		if (text.length === length) {
			const otpArray = text.split('').slice(0, length).map(normalizeIfNeeded);

			onChange?.(otpArray.join(''));
			onCompleteOTP(otpArray.join(''));
			// Set focus to the last input box
			inputs.current[length - 1]?.focus();
			setFocusedIndex(length - 1);
		}
	};

	const onKeyPress = ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
		let text = key === 'Backspace' || key.length > 1 ? '' : key;

		text = normalizeIfNeeded(text);

		const newOtp = { ...values };
		let nextIndex = null;
		const prevValue = values[index];

		//Backspace inside the field
		if (!text && !prevValue && index > 0) {
			nextIndex = index - 1;
			newOtp[nextIndex] = '';
		} else if (text && index !== length - 1) {
			nextIndex = index + 1;
		}

		newOtp[index] = text;

		setValues(newOtp);
		onChange?.(Object.values(newOtp).join(''));

		if (index === length - 1 && text) {
			onCompleteOTP(Object.values(newOtp).join(''));
		}

		// Move to the next or prev input
		if (nextIndex !== null) {
			inputs.current[nextIndex]?.focus();
			setFocusedIndex(nextIndex);
		}
	};

	return (
		<View style={tw`${fieldStyles.container}`}>
			{Array.from({ length }).map((_, index) => {
				const isFocused = focusedIndex === index;
				const boxStyles = styles.inputBox(isFocused, props.disabled, props.hasErrors, props.showSuccess);

				return (
					<Pressable
						disabled={props.disabled}
						onPress={() => inputs.current[index]?.focus()}
						key={index}
						style={tw`${boxStyles.wrapper}`}
					>
						<TextInput
							ref={(el) => (inputs.current[index] = el!)}
							selectionColor="#B2B4C0"
							onChange={(e) => e.preventDefault()}
							style={[tw`${boxStyles.input}`]}
							value={values[index]}
							onChangeText={onChangeText}
							onKeyPress={(e) => onKeyPress(e, index)}
							keyboardType="number-pad"
							autoComplete="one-time-code" // For autofill OTP in android and ios
							textContentType="oneTimeCode" // For autofill OTP in ios only (fallback if autocomplete failed in ios)
							maxLength={index === 0 ? length : 1}
							textAlign={Platform.OS === 'ios' ? 'left' : 'center'}
							editable={!props.disabled}
							placeholder={placeholder}
							onFocus={() => setFocusedIndex(index)}
							onBlur={() => setFocusedIndex(null)}
							autoFocus={index === 0}
							{...props}
						/>
					</Pressable>
				);
			})}
		</View>
	);
};

export default OTPField;
