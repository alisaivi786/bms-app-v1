import clsx from 'clsx';
import { ComponentSize } from '@devkit/utilities/src/types';

const description = 'flex w-full pt-1.5 text-caption1 text-gray-700 font-medium text-caption1';

const counterClassNames = (hasErrors: boolean) =>
	clsx('pt-1.5 text-caption1', hasErrors ? 'text-red-500' : 'text-gray-600');

const inputContainer = (
	disabled: boolean,
	hasErrors: boolean,
	isFocused: boolean,
	isTextArea: boolean,
	isSearch?: boolean,
	size?: ComponentSize
) =>
	clsx([
		'w-full nj-text-input-container-bg nj-text-input-container-border-radius nj-text-input-container-padding overflow-hidden',
		size === 'small' && 'nj-text-input-container-padding-small',
		size === 'large' && 'nj-text-input-container-padding-large',
		isTextArea &&
			'nj-text-area-container-height nj-text-area-container-bg nj-text-area-container-padding nj-text-area-container-border-radius',
		disabled &&
			'nj-text-input-container-disabled-border nj-text-input-container-disabled-border-color nj-text-input-container-disabled-bg',
		!disabled && [
			hasErrors && [
				'border-2 nj-text-input-container-error-border-color nj-text-input-container-error-bg',
				isTextArea && 'nj-text-area-container-error-bg',
			],
			!hasErrors && [
				isFocused && 'border-2 nj-border-brand',
				!isFocused && [
					'border border-gray-600',
					isTextArea && 'nj-text-area-container-border-width nj-text-area-container-border-color',
				],
				isSearch && 'nj-text-input-container-search-border-width nj-text-input-container-search-bg',
			],
		],
	]);

const innerInputContainer = (reverseLayout?: boolean, isTextArea?: boolean) =>
	clsx([
		'flex flex-row gap-2 w-full items-center',
		isTextArea && 'nj-text-area-align-items',
		reverseLayout ? 'flex-row-reverse' : 'flex-row',
	]);

const inputBase = (disabled: boolean, hasErrors: boolean, isTextArea: boolean, size?: ComponentSize) =>
	clsx(
		'grow py-0 nj-text-input-font nj-text-input-line-height nj-text-input-font-size',
		size === 'small' && 'nj-text-input-font-size-small',
		size === 'large' && 'nj-text-input-font-size-large',
		isTextArea && 'nj-text-area-font nj-text-area-line-height nj-text-area-letter-spacing',
		disabled ? 'nj-text-input-font-color' : 'text-gray-900',
		!disabled && [hasErrors && 'nj-error-text-font-color', !hasErrors && 'text-gray-900']
	);

const input = (disabled: boolean, hasErrors: boolean, isTextArea: boolean, size?: ComponentSize) => {
	return clsx(inputBase(disabled, hasErrors, isTextArea, size));
};

const textArea = (disabled: boolean, hasErrors: boolean, isTextArea: boolean, size?: ComponentSize) =>
	clsx(inputBase(disabled, hasErrors, isTextArea, size));

const prefixArea = (disabled: boolean, hasValue: boolean, size?: ComponentSize) => ({
	container: (reverseLayout: boolean) =>
		clsx(`flex ${reverseLayout ? 'flex-row-reverse' : 'flex-row'} gap-2 nj-text-input-prefix-align-items`),
	suffix: clsx(
		'nj-text-input-font nj-text-input-font-size nj-text-input-line-height',
		disabled && 'text-gray-600',
		!disabled && [hasValue && 'text-gray-900', !hasValue && 'nj-text-input-prefix-default-color'],
		size === 'small' && 'nj-text-input-font-size-small',
		size === 'large' && 'nj-text-input-font-size-large'
	),
});

const postfixArea = (reverseLayout: boolean, disabled: boolean) => ({
	container: clsx(['flex flex-row gap-2', !reverseLayout && 'flex-row', reverseLayout && 'flex-row-reverse']),
	clearIcon: (pressed: boolean) =>
		clsx([disabled && 'text-gray-400', !disabled && [!pressed && 'text-black', pressed && 'text-gray-600']]),
	endIcon: (pressed: boolean, hasErrors?: boolean) =>
		clsx([
			disabled && 'text-gray-400',
			!disabled && [!pressed && 'text-black', pressed && 'text-gray-600'],
			!!hasErrors && 'text-red-500',
		]),
});

const startIcon = (pressed: boolean, disabled: boolean) =>
	clsx([disabled && 'text-gray-400', !disabled && [!pressed && 'text-black', pressed && 'text-gray-600']]);

const footerContainer = (hasDecsOrError?: boolean) =>
	clsx('flex flex-row gap-5 w-full', hasDecsOrError ? 'justify-between' : 'justify-end');

const eyeIconStyle = (disabled?: boolean) => clsx('!w-5', disabled ? 'text-gray-600' : 'text-black');

export default {
	inputContainer,
	innerInputContainer,
	input,
	textArea,
	description,
	counterClassNames,
	postfixArea,
	prefixArea,
	footerContainer,
	eyeIconStyle,
	startIcon,
};
