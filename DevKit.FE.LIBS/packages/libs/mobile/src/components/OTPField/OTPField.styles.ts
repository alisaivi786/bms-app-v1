import clsx from 'clsx';

const otpField = () => ({
	container: clsx('flex flex-row justify-between items-center nj-otp-container direction-ltr'),
});

const inputBox = (isFocused: boolean, isDisabled: boolean | undefined, hasErrors: boolean | undefined, showSuccess: boolean | undefined) => ({
	wrapper: clsx(
		'rounded-lg nj-otp-input-wrapper',
		isDisabled && 'nj-otp-input-disabled',
		!isDisabled && [
			'bg-white',
			!hasErrors && [
				showSuccess && ['nj-otp-cell-border-size', 'nj-otp-positive-cell-border-color'],
				!showSuccess && ['border', 'border-gray-300'],
			],
			hasErrors && ['nj-otp-cell-border-size', 'nj-otp-cell-border-color'],
			isFocused && ['border-2', 'border-brand-700'],
		]
	),
	input: clsx('nj-otp-input', isDisabled && 'nj-otp-input-disabled-text-color'),
});

export default {
	otpField,
	inputBox,
};
