import React, { ReactNode, useCallback, useId, useMemo, useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';
import { ComponentSize, TextFieldAutoFillTypes } from '@devkit/utilities';
import { TextAlignVertical } from '@devkit/utilities/src/types';
import { useMobileUIConfigOptions } from '../../layouts';
import { PostfixArea } from './PostfixArea';
import { PrefixArea } from './PrefixArea';
import styles from './TextField.styles';

export type InputComponentProps = {
	disabled: boolean;
	placeholder: string | undefined;
	suffix: string | undefined;
	maxLength: number | undefined;
	returnKeyType?: 'done' | 'next' | 'search' | 'send' | 'go';
	onSubmitEditing?: () => void;
	submitBehavior?: 'submit' | 'blurAndSubmit' | 'newline';
	enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
	returnKeyLabel?: string;
	dir: 'ltr' | 'rtl';
	placeholderDir?: 'ltr' | 'rtl';
	autoFill: TextFieldAutoFillTypes | undefined;
	hasErrors: boolean;
	type: 'number' | 'text' | 'text-area' | 'password';
	isClearable: boolean;
	onClearValue: () => void;
	inputRef: { current: TextInput | null };
	size: ComponentSize;
	startIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	endIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	rotateEndIconOnFocus: boolean;
	readOnly: boolean;
	alwaysShowClearIcon: boolean;
	isFocused: boolean;
	onChange: (value: string | number | undefined) => void;
	onIconClick?: (iconType: 'start' | 'end') => void;
	onPaste?: (pastedContent: string) => string | undefined;
	onFocus: ((e?: object) => void) | undefined;
	onBlur: ((e?: object) => void) | undefined;
	formId: string | undefined;
	mask: string | undefined;
	inputMode: undefined | 'search' | 'email' | 'none' | 'tel' | 'text' | 'url' | 'numeric' | 'decimal';
	inputValue: string | number | undefined;
	setInputSelection: React.Dispatch<
		React.SetStateAction<
			| {
					start: number;
					end: number;
			  }
			| undefined
		>
	>;
	setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
	suffixNode?: ReactNode;
	postfixNode?: ReactNode;
	variant?: 'default' | 'search';
	showSoftInputOnFocus?: boolean;
	textAlignVertical: TextAlignVertical;
};

const TextField = ({
	suffix,
	maxLength,
	returnKeyType,
	onSubmitEditing,
	submitBehavior,
	enterKeyHint,
	returnKeyLabel,
	placeholder,
	disabled,
	autoFill,
	type,
	hasErrors,
	isClearable,
	onClearValue,
	inputRef,
	startIcon: StartIcon,
	endIcon: EndIcon,
	size = 'medium',
	readOnly = false,
	alwaysShowClearIcon,
	rotateEndIconOnFocus,
	isFocused,
	onChange,
	onIconClick,
	onBlur,
	onFocus,
	onPaste,
	inputMode,
	inputValue,
	setInputSelection,
	setIsFocused,
	suffixNode,
	postfixNode,
	variant = 'default',
	showSoftInputOnFocus = true,
	dir,
	textAlignVertical = 'top',
}: InputComponentProps) => {
	const id = `${useId()}${Date.now()}`;
	const [showPassword, setShowPassword] = useState(type !== 'password');
	const { tw, isRtlLocale, customColors, reverseLayout } = useMobileUIConfigOptions();

	const isSearch = useMemo(() => variant === 'search', [variant]);
	const isTextArea = useMemo(() => type === 'text-area', [type]);

	const placeholderTextColor = useMemo(() => {
		if (disabled) {
			return tw.color('gray-600');
		} else {
			if (hasErrors) return tw.color('red-500');

			return isSearch ? customColors?.['search-placeholder'] || tw.color('gray-500') : tw.color('gray-500');
		}
	}, [customColors, disabled, isSearch, tw, hasErrors]);

	// The ltrMark is a Unicode Left-To-Right Mark (U+200E) used as a workaround for Android RTL issues.
	// In RTL mode on Android, text containing symbols (like '-') may be visually reversed even if the field should be LTR.
	// e.g. '1982-8460835-7' may be displayed as '7-8460835-1982' without the ltrMark.
	// Prepending ltrMark forces Android to render the text in left-to-right order, ensuring correct display for masked inputs.
	const ltrMark = isRtlLocale && dir === 'ltr' && Platform.OS === 'android' ? '\u200E' : '';

	// Determine if we need to manually reverse the layout
	// Three RTL scenarios to handle:
	// 1. First approach (allowRTL: false): App sets isRtlLocale=true, I18nManager.isRTL=false, manually reverse layout (eg Molo)
	// 2. Second approach (forceRTL: true): App still sets isRtlLocale=true, but I18nManager.isRTL=true, automatic RTL (eg SuperApp)
	// 3. Component-level override: dir prop overrides app-level settings for this specific component

	const mustReverseLayout = isRtlLocale !== (dir === 'rtl') ? !reverseLayout : reverseLayout;

	// Adjust maxLength to account for LTR mark on Android Arabic
	// Only Android counts the invisible LTR mark toward maxLength, iOS doesn't
	const adjustedMaxLength = !maxLength ? undefined : ltrMark && Platform.OS === 'android' ? maxLength + 1 : maxLength;

	const direction = dir ?? 'inherit';

	const handleTextChange = useCallback(
		(text: string) => {
			const cleanText = removeLtrMark(text, ltrMark);
			const currentValue = removeLtrMark(inputValue?.toString() || '', ltrMark);

			// Comprehensive paste detection logic:
			// We detect paste by analyzing the difference between new text and current value
			const textLengthDiff = Math.abs(cleanText.length - currentValue.length);
			const hasContentChanged = cleanText !== currentValue;

			// To detect paste comprehensively, we need to distinguish between:
			// 1. User typing a single character (length increases by 1)
			// 2. User pasting a single character (length increases by 1) - HARD TO DETECT
			// 3. User deleting a character (length decreases by 1)
			// 4. User pasting multiple characters (length changes by > 1)
			// 5. User pasting over selected text (length might stay same or change by any amount)

			// Since we can't reliably distinguish single-character paste from typing with just text diff,
			// we use a heuristic: any non-trivial change is likely a paste

			// Check if this is a simple single-character addition at the end (typical typing)
			const isLikelyTyping =
				cleanText.length === currentValue.length + 1 && cleanText.startsWith(currentValue) && textLengthDiff === 1;

			// Check if this is a simple single-character deletion
			const isLikelyDeletion = cleanText.length === currentValue.length - 1;

			// Paste detection scenarios:
			// 1. Multiple characters changed at once (textLengthDiff > 1)
			// 2. Content changed but length stayed the same (replacement paste)
			// 3. Single character change that's NOT simple append or delete
			// 4. Any change when content is non-empty and changed
			const isPaste = cleanText.length > 0 && hasContentChanged && !isLikelyTyping && !isLikelyDeletion;

			if (isPaste && onPaste) {
				// Allow onPaste to manipulate the content
				const manipulatedContent = onPaste(cleanText);

				// If onPaste returns a different value, use it
				if (manipulatedContent !== undefined) {
					onChange(manipulatedContent);
				} else {
					onChange(cleanText);
				}
			} else {
				onChange(cleanText);
			}
		},
		[ltrMark, inputValue, onPaste, onChange]
	);

	return (
		<Pressable
			onPress={() => {
				inputRef.current?.focus();
			}}
		>
			<View style={tw`${styles.inputContainer(disabled, hasErrors, isFocused, isTextArea, isSearch, size)}`}>
				<View style={tw`${styles.innerInputContainer(mustReverseLayout, isTextArea)}`}>
					{isTextArea ? (
						<TextInput
							selectionColor="#B2B4C0"
							value={concatLtrMark(inputValue, ltrMark)}
							multiline={true}
							autoComplete={autoFill ?? 'off'}
							autoCorrect={false}
							spellCheck={false}
							maxLength={adjustedMaxLength}
							returnKeyType={returnKeyType}
							onSubmitEditing={onSubmitEditing}
							submitBehavior={submitBehavior}
							enterKeyHint={enterKeyHint}
							returnKeyLabel={returnKeyLabel}
							style={[tw`${styles.textArea(disabled, hasErrors, isTextArea, size)}`, { direction }]}
							placeholder={concatLtrMark(placeholder, ltrMark)}
							editable={!disabled}
							inputMode={inputMode}
							placeholderTextColor={placeholderTextColor}
							numberOfLines={4}
							textAlignVertical={textAlignVertical}
							showSoftInputOnFocus={showSoftInputOnFocus}
							textAlign={dir === 'rtl' ? 'right' : 'left'}
							onSelectionChange={(event) => {
								setInputSelection(event.nativeEvent.selection);
							}}
							onChangeText={handleTextChange}
							onFocus={(e) => {
								setIsFocused(true);
								onFocus?.(e);
							}}
							onBlur={(e) => {
								setIsFocused(false);
								onBlur?.(e);
							}}
							ref={inputRef}
							readOnly={disabled || readOnly}
						/>
					) : (
						<>
							<PrefixArea
								disabled={disabled}
								suffix={concatLtrMark(suffix, ltrMark)}
								size={size}
								inputRef={inputRef}
								icon={StartIcon}
								onIconClick={() => onIconClick?.('start')}
								suffixNode={suffixNode}
								inputValue={inputValue}
								reverseLayout={mustReverseLayout}
							/>
							<TextInput
								selectionColor="#B2B4C0"
								value={concatLtrMark(inputValue, ltrMark)}
								id={id}
								ref={inputRef}
								autoComplete={autoFill ?? 'off'}
								autoCorrect={false}
								spellCheck={false}
								maxLength={adjustedMaxLength}
								returnKeyType={returnKeyType}
								onSubmitEditing={onSubmitEditing}
								submitBehavior={submitBehavior}
								enterKeyHint={enterKeyHint}
								returnKeyLabel={returnKeyLabel}
								placeholder={concatLtrMark(placeholder, ltrMark)}
								editable={!disabled}
								readOnly={disabled || readOnly}
								secureTextEntry={type === 'password' && !showPassword}
								style={[
									tw`${styles.input(disabled, hasErrors, isTextArea, size)}`,
									{ direction },
									Platform.OS === 'android' && { includeFontPadding: false, textAlignVertical: 'center' },
								]}
								inputMode={inputMode}
								showSoftInputOnFocus={showSoftInputOnFocus}
								onSelectionChange={(event) => {
									setInputSelection(event.nativeEvent.selection);
								}}
								textAlign={dir === 'rtl' ? 'right' : 'left'}
								placeholderTextColor={placeholderTextColor}
								keyboardType={type === 'number' ? 'numeric' : 'default'}
								onChangeText={handleTextChange}
								onFocus={(e) => {
									setIsFocused(true);
									onFocus?.(e);
								}}
								onBlur={(e) => {
									setIsFocused(false);
									onBlur?.(e);
								}}
							/>
							<PostfixArea
								inputValue={`${inputValue}`}
								disabled={disabled}
								isClearable={isClearable}
								hasErrors={hasErrors}
								alwaysShowClearIcon={alwaysShowClearIcon}
								isFocused={isFocused}
								isPasswordField={type === 'password'}
								rotateEndIconOnFocus={rotateEndIconOnFocus}
								size={size}
								icon={EndIcon}
								onClear={() => {
									onClearValue();

									if (!isFocused) {
										onBlur?.();
									}
								}}
								onIconClick={() => onIconClick?.('end')}
								showPassword={showPassword}
								onChangeShowPassword={() => setShowPassword((prev) => !prev)}
								postfixNode={postfixNode}
								reverseLayout={mustReverseLayout}
							/>
						</>
					)}
				</View>
			</View>
		</Pressable>
	);
};

const concatLtrMark = (text: string | number | undefined, ltrMark: string | undefined) =>
	text && ltrMark ? `${ltrMark}${text}` : text?.toString();

const removeLtrMark = (text: string, ltrMark: string | undefined) => (ltrMark ? text.replace(ltrMark, '') : text);

export default TextField;
