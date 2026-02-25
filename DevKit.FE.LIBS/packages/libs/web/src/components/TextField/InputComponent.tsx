'use client';

import React, { ReactNode, useId, useRef } from 'react';
import { TextFieldAutoFillTypes, useMask } from '@devkit/utilities';
import { ComponentSize, FieldStatusType } from '@devkit/utilities/src/types/Forms/Common';
import { PrefixArea } from './PrefixArea';
import { SuffixArea } from './SuffixArea';
import styles from './TextField.styles';

declare global {
	// eslint-disable-next-line no-var
	var njTimeStamp: number;
}

const whitelistedKeyCodes = [8, 9, 46, 37, 39];

export type InputComponentProps = {
	disabled: boolean;
	placeholder: string | undefined;
	suffix: ReactNode | undefined;
	prefix: ReactNode | undefined;
	maxLength: number | undefined;
	dir: 'ltr' | 'rtl';
	placeholderDir?: 'ltr' | 'rtl';
	noCopy: boolean | undefined;
	noPaste: boolean | undefined;
	autoFill: TextFieldAutoFillTypes | undefined;
	hasErrors: boolean;
	type: 'number' | 'text' | 'text-area' | 'password';
	isClearable: boolean;
	onClearValue: () => void;
	inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
	size: ComponentSize;
	startIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	endIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	rotateEndIconOnFocus: boolean;
	readOnly: boolean;
	alwaysShowClearIcon: boolean;
	isFocused: boolean;
	onChange: (value: string | undefined) => void;
	onIconClick?: (iconType: 'start' | 'end') => void;
	onFocus: (() => void) | undefined;
	onBlur: (() => void) | undefined;
	formId: string | undefined;
	onPaste?: (value: string) => string;
	mask?: string;
	maskReverse?: boolean;
	inputMode?: 'search' | 'email' | 'none' | 'tel' | 'text' | 'url' | 'numeric' | 'decimal';
	defaultValue?: string;
	decimalPlaces?: 0 | 2 | 4;
	status?: FieldStatusType;
};

const InputComponent = ({
	dir,
	suffix,
	prefix,
	maxLength,
	placeholder,
	disabled,
	noCopy,
	noPaste,
	autoFill,
	type,
	hasErrors,
	isClearable,
	onClearValue,
	inputRef,
	startIcon: StartIcon,
	endIcon: EndIcon,
	size = 'medium',
	readOnly,
	alwaysShowClearIcon,
	rotateEndIconOnFocus,
	isFocused,
	onChange,
	onIconClick,
	onBlur,
	onFocus,
	onPaste,
	mask,
	maskReverse = false,
	placeholderDir,
	inputMode,
	defaultValue,
	decimalPlaces,
	status,
}: InputComponentProps) => {
	const inputContainerRef = React.useRef<HTMLDivElement>(null);
	const id = `${useId()}${globalThis.njTimeStamp ?? Date.now()}`;
	const { applyMask } = useMask({ mask, reverse: maskReverse });
	const inputInternalType = useRef(type === 'number' ? 'tel' : type);

	return (
		<div
			className={styles.inputContainer(disabled, hasErrors)}
			onClick={() => {
				inputRef.current?.focus?.();
			}}
			dir={dir}
			ref={inputContainerRef}
		>
			{type === 'text-area' ? (
				<textarea
					rows={5}
					autoComplete={autoFill ?? 'none'}
					maxLength={maxLength}
					className={styles.textArea(disabled, isFocused, hasErrors, size, status)}
					placeholder={placeholder}
					disabled={disabled}
					onCopy={(e) => {
						if (noCopy) e.preventDefault();
					}}
					inputMode={inputMode}
					onPaste={(e) => {
						if (noPaste) e.preventDefault();
						else if (onPaste) {
							e.preventDefault();
							const pastedValue = e.clipboardData.getData('Text');

							const finalValue = onPaste(pastedValue);

							onChange?.(finalValue);

							if (inputRef && inputRef.current)
								inputRef.current.setSelectionRange(finalValue.length, finalValue.length);
						}
					}}
					onInput={(e) => onChange(e.currentTarget.value)}
					onFocus={() => {
						onFocus?.();
					}}
					onBlur={() => {
						onBlur?.();
					}}
					ref={inputRef as React.RefObject<HTMLTextAreaElement>}
					readOnly={readOnly ?? false}
				/>
			) : (
				<>
					<SuffixArea
						disabled={disabled}
						suffix={suffix}
						inputRef={inputRef}
						icon={StartIcon}
						onIconClick={() => onIconClick?.('start')}
						size={size}
					/>
					<input
						id={id}
						defaultValue={defaultValue}
						ref={inputRef as React.RefObject<HTMLInputElement>}
						autoComplete={autoFill ?? 'none'}
						maxLength={maxLength}
						placeholder={placeholder}
						disabled={disabled}
						readOnly={readOnly ?? false}
						className={styles.input(disabled, isFocused, hasErrors, size, placeholderDir, status)}
						inputMode={inputMode}
						onCopy={(e) => {
							if (noCopy) e.preventDefault();
						}}
						onPaste={(e) => {
							if (noPaste) e.preventDefault();
							else if (onPaste) {
								e.preventDefault();

								const pastedValue = e.clipboardData.getData('Text');
								const finalValue = onPaste(pastedValue);

								onChange?.(finalValue);

								const maskedValue = applyMask(finalValue).result;

								if (inputRef && inputRef.current)
									inputRef.current.setSelectionRange(maskedValue.length, maskedValue.length);
							}
						}}
						// fix tel dir to be used as number field
						dir={dir}
						onKeyDown={(event) => {
							const pressedKey = event.key;

							if (
								whitelistedKeyCodes.includes(event.keyCode) ||
								event.ctrlKey ||
								event.metaKey ||
								event.altKey ||
								event.shiftKey
							) {
								return;
							}

							if (type === 'number' && pressedKey) {
								if (decimalPlaces && decimalPlaces > 0) {
									if (!/^[0-9\u0660-\u0669.]$/.test(pressedKey)) {
										event.preventDefault();
									}
								} else {
									if (!/^[0-9\u0660-\u0669]+$/.test(pressedKey)) {
										event.preventDefault();
									}
								}
							}
						}}
						type={inputInternalType.current}
						onInput={(e) => onChange(e.currentTarget.value)}
						onFocus={() => {
							onFocus?.();
						}}
						onBlur={() => {
							onBlur?.();
						}}
					/>
					<PrefixArea
						disabled={disabled}
						isClearable={isClearable}
						hasErrors={hasErrors}
						alwaysShowClearIcon={alwaysShowClearIcon}
						inputRef={inputRef}
						isFocused={isFocused}
						isPasswordField={type === 'password'}
						inputInternalType={inputInternalType}
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
						prefix={prefix}
					/>
				</>
			)}
		</div>
	);
};

export default InputComponent;
