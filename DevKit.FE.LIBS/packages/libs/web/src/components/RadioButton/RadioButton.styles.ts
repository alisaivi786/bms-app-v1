import clsx from 'clsx';
import { RadioBoxSize } from '@devkit/utilities/src/types';

const isHasErrorStyles = (isChecked: boolean) => ({
	true: `${isChecked ? 'border-red-500 text-red-500' : 'bg-gray-100 border-red-500'} 
	`,
	false: `${isChecked ? 'nj-border-brand nj-text-brand' : 'bg-gray-100 border-gray-600'} 
`,
});

const container = 'w-full text-caption1 gap-3 grid';

const RadioButtonWrapper = (size: RadioBoxSize, effect: boolean, hasError: boolean) =>
	clsx(
		'relative',
		effect && [
			'before:rounded-full before:opacity-30 before:animate-ping-once before:top-0 before:block before:absolute before:nj-bg-brand ',
			hasError && 'before:bg-red-500',
			size === 'x-small' && ['before:w-4 before:h-4'],
			size === 'small' && ['before:w-5 before:h-5'],
			size === 'medium' && ['before:w-6 before:h-6'],
			size === 'large' && ['before:w-8 before:h-8'],
		]
	);

const RadioButton = (
	size: RadioBoxSize,
	isChecked: boolean,
	hasError = false,
	disabled: boolean | undefined,
	active: boolean | undefined
) =>
	clsx(
		'flex items-center justify-center rounded-full border border-solid relative',
		disabled ? 'opacity-30 pointer-events-none' : 'cursor-pointer',
		isHasErrorStyles(isChecked)[`${hasError}`],
		size === 'x-small' && ['h-4 w-4'],
		size === 'small' && ['h-5 w-5'],
		size === 'medium' && ['h-6 w-6'],
		size === 'large' && ['h-8 w-8'],
		active && hasError && 'border-red-500',
		active && !hasError && 'nj-border-brand'
	);

const label = (size: RadioBoxSize, disabled?: boolean) =>
	clsx(
		'flex items-center font-normal leading-none flex-1',
		disabled ? 'opacity-30 pointer-events-none' : 'cursor-pointer',
		size === 'large'
			? 'text-body'
			: size === 'medium'
			? 'text-paragraph'
			: size === 'small'
			? 'text-caption1'
			: size === 'x-small'
			? 'text-caption1'
			: ''
	);

const descriptionClassNames = 'flex w-full pt-1.5 text-caption1 text-gray-600';
const checkIcon = (size: RadioBoxSize, hasError = false) =>
	clsx(
		'w-full h-full rounded-full border-gray-100',
		hasError ? 'bg-red-500' : 'nj-bg-brand',
		size === 'x-small' && 'border-2',
		size === 'small' && 'border-2',
		size === 'medium' && 'border-4',
		size === 'large' && 'border-4'
	);

const radioContainer = (highlighted?: boolean, widthFull?: boolean) =>
	clsx('relative flex items-center', highlighted && '-m-2.5 p-2.5 rounded-md bg-brand-200', widthFull ? '' : 'w-fit');

const input = 'absolute w-0 h-0 overflow-hidden opacity-0';

const labelContainer = 'flex items-center flex-1 gap-3';

export default {
	descriptionClassNames,
	RadioButtonWrapper,
	RadioButton,
	container,
	checkIcon,
	label,
	radioContainer,
	labelContainer,
	input,
};
