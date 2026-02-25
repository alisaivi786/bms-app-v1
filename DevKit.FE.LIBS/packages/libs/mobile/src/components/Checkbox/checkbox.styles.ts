import clsx from 'clsx';
import { CheckBoxSize } from '@devkit/utilities';
import { fontSizes } from '../../themes/defaultTheme/fontSizes';

const checkboxContainer = clsx('flex-row items-center gap-3');

const checkbox = (
	isChecked: boolean,
	disabled: boolean,
	hasErrors: boolean,
	isIndeterminate: boolean,
	size: CheckBoxSize = 'small'
) =>
	clsx(
		`w-5 h-5 rounded-md border-[1px] justify-center items-center
		${isChecked ? 'bg-brand-600' : 'bg-gray-100'} 
		${disabled ? 'border-gray-300' : isChecked ? 'border-brand-600' : 'border-gray-600'}
		${disabled && isChecked && 'bg-gray-300'}
		${hasErrors && 'border-red-500'}
		${hasErrors && isChecked && 'bg-red-500'}
		${isIndeterminate && 'bg-white '}
		`,
		size === 'x-small' && ['w-4 h-4'],
		size === 'medium' && ['w-6 h-6'],
		size === 'large' && ['w-8 h-8']
	);

const iconStyling = (isIndeterminate: boolean, size: CheckBoxSize = 'small') =>
	clsx(
		`${isIndeterminate ? 'text-brand-600' : 'text-white '} `,
		size === 'large'
			? 'text-body pt-1'
			: size === 'medium'
			? 'text-paragraph pt-0.5'
			: size === 'small'
			? 'text-caption1 pt-0.5'
			: size === 'x-small'
			? 'text-caption1'
			: ''
	);

const iconDimension = (size: CheckBoxSize = 'small') =>
	size === 'large'
		? parseInt(fontSizes.body, 10)
		: size === 'medium'
		? parseInt(fontSizes.paragraph, 10)
		: size === 'small'
		? parseInt(fontSizes.caption1, 10)
		: size === 'x-small'
		? parseInt(fontSizes.caption2, 10)
		: 12;


const checkboxLabel = (size: CheckBoxSize = 'small') =>
	clsx(
		size === 'large' && ['text-body'],
		size === 'medium' && ['text-paragraph'],
		size === 'small' && ['text-caption1'],
		size === 'x-small' && ['text-caption1']
	);

export default {
	checkboxContainer,
	checkbox,
	iconStyling,
	iconDimension,
	checkboxLabel,
};
