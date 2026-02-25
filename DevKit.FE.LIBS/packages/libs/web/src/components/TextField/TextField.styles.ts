import clsx from 'clsx';
import { CSSProperties } from 'react';
import { ComponentSize } from '@devkit/utilities';
import { FieldStatusType } from '@devkit/utilities/src/types';

/**
 * special styles used for checkout frames which shown inside input style
 * @returns
 */
const paymentInputStyles: { base: CSSProperties; placeholder: { base: CSSProperties; }; } = {
	base: {
		color: '#000000',
		fontSize: '16px',
		height: '40px',
		paddingInlineStart: '16px',
		paddingInlineEnd: '16px',
		paddingTop: '10px',
		paddingBottom: '10px',
	},
	placeholder: {
		base: {
			color: '#B2B4C0',
		},
	},
};

const description = 'flex w-full pt-1.5 text-caption1 text-gray-700 font-medium text-caption1';

const counterClassNames = (hasErrors: boolean) =>
	clsx('pt-1.5 text-caption1', hasErrors ? 'text-red-500' : 'text-gray-600');

const mainContainer = (size: ComponentSize) =>
	clsx(
		'relative text-black',
		size === 'small' && 'text-paragraph',
		size === 'medium' && 'text-body',
		size === 'large' && 'text-body'
	);

const inputContainer = (disabled: boolean, hasErrors: boolean) =>
	clsx(
		'flex items-center font-normal leading-none',
		disabled && 'text-gray-400',
		hasErrors && !disabled && 'text-red-500 '
	);

const inputBase = (disabled: boolean, isFocused: boolean, hasErrors: boolean, size: ComponentSize, status?: FieldStatusType) =>
	clsx(
		'w-full nj-button-border-radius border border-gray-500 placeholder:text-gray-500 nj-bg-input',
		!hasErrors && isFocused && '!nj-border-brand !outline !outline-2 !nj-outline-brand',
		hasErrors && !disabled && 'placeholder:!text-red-500 border-2 border-red-500 !bg-red-50',
		disabled && '!bg-gray-50 text-gray-400 !border-gray-400 opacity-100',
		size === 'small' && 'px-2 py-1.5 text-paragraph',
		size === 'medium' && 'px-4 py-2.5',
		size === 'large' && 'px-4 py-3',
		status === 'edited' && 'nj-input-highlighted-bg'
	);

const input = (
	disabled: boolean,
	isFocused: boolean,
	hasErrors: boolean,
	size: ComponentSize,
	placeholderDir?: 'ltr' | 'rtl',
	status?: FieldStatusType
) => {
	return clsx(
		placeholderDir
			? placeholderDir === 'rtl'
				? 'placeholder:rtl:text-right'
				: 'placeholder:text-left'
			: 'placeholder:rtl:text-right',
		inputBase(disabled, isFocused, hasErrors, size, status),
		size === 'small' && 'h-8',
		size === 'medium' && 'h-10',
		size === 'large' && 'h-12'
	);
};

const textArea = (disabled: boolean, isFocused: boolean, hasErrors: boolean, size: ComponentSize, status?: FieldStatusType) =>
	inputBase(disabled, isFocused, hasErrors, size, status);

const paymentInput = (isFocused: boolean, hasErrors: boolean) => {
	return clsx(input(false, isFocused, hasErrors, 'medium'), 'relative overflow-hidden !p-0');
};

const paymentIcon = 'absolute h-10 pe-4 ps-2 py-2.5 top-0 end-0 flex items-center';

const suffixArea = (size: ComponentSize, disabled: boolean, noSuffix: boolean) => ({
	container: clsx(
		'absolute flex items-center px-3 gap-2.5 start-0',
		!noSuffix && 'pe-1',
		noSuffix && 'pe-2.5',
		size === 'small' && 'ps-3 text-paragraph',
		size !== 'small' && 'ps-4 text-body'
	),
	suffix: 'text-black',
	endIcon: clsx('h-3 w-3 hover:text-gray-800', disabled && 'text-gray-500', !disabled && 'text-black'),
});

const prefixArea = (size: ComponentSize, disabled: boolean) => ({
	container: clsx(
		'absolute flex items-center px-3 gap-2.5 ps-2.5 end-0',
		size === 'small' && 'pe-3 text-paragraph',
		size !== 'small' && 'pe-4 text-body'
	),
	clearIcon: 'h-3 w-3 text-gray-500 hover:text-gray-400',
	endIcon: clsx('h-3 w-3 hover:text-gray-800', disabled && 'text-gray-500', !disabled && 'text-black'),
});

const iconRotate = (rotateIconOnFocus: boolean, isFocus: boolean) =>
	clsx('transition-transform', rotateIconOnFocus && isFocus && 'rotate-180 duration-300 ease-in');

const footerContainer = (hasDecsOrError?: boolean) =>
	clsx('flex gap-5 w-full', hasDecsOrError ? 'justify-between' : 'justify-end');

const eyeIconStyle = (disabled?: boolean) => clsx('!w-5', disabled ? 'text-gray-500' : 'text-black');

const prefixAreaButton = (disabled?: boolean) => clsx('block', disabled ? '' : 'cursor-pointer');

export default {
	inputContainer,
	input,
	textArea,
	description,
	counterClassNames,
	prefixArea,
	suffixArea,
	mainContainer,
	iconRotate,
	footerContainer,
	paymentInputStyles,
	paymentInput,
	paymentIcon,
	eyeIconStyle,
	prefixAreaButton,
};
