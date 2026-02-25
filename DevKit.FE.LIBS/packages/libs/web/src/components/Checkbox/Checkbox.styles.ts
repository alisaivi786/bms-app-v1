import clsx from 'clsx';
import { CheckBoxSize } from '@devkit/utilities';

const container = (highlighted?: boolean) =>
	clsx('flex w-fit text-caption1 gap-2 items-start relative', highlighted && '-m-2 p-2 rounded-md bg-brand-200');

const checkboxWrapper = (hasError: boolean | undefined, size: CheckBoxSize, effect: boolean) =>
	clsx(
		'relative',
		effect && [
			'before:rounded-full before:opacity-30 before:animate-ping-once before:top-0 before:block before:nj-bg-brand before:absolute ',
			hasError && ' before:block before:bg-red-500',
			size === 'x-small' && ['before:w-4 before:h-4'],
			size === 'small' && ['before:w-5 before:h-5'],
			size === 'medium' && ['before:w-6 before:h-6'],
			size === 'large' && ['before:w-8 before:h-8'],
		]
	);

const checkbox = (
	disabled: boolean,
	isChecked: boolean,
	isIndeterminate: boolean,
	hasError: boolean | undefined,
	size: CheckBoxSize,
	active: boolean | undefined
) =>
	clsx(
		'flex items-center justify-center rounded border-2 border-solid relative ',
		disabled ? 'opacity-30 pointer-events-none' : 'cursor-pointer',
		isChecked || isIndeterminate
			? hasError
				? 'bg-red-500 hover:bg-red-700'
				: 'nj-bg-brand nj-border-brand'
			: 'border-gray-500 bg-white',
		hasError && 'border-red-500',
		active && hasError && 'border-red-500',
		active && !hasError && 'nj-border-brand',
		size === 'x-small' && ['h-4 w-4'],
		size === 'small' && ['h-5 w-5'],
		size === 'medium' && ['h-6 w-6'],
		size === 'large' && ['h-8 w-8']
	);

const icon = 'text-white h-4/6 w-4/6 z-10';

const label = (
	disableVariant: 'box-only' | 'all',
	disabled: boolean,
	label: React.ReactNode,
	hasError: boolean | undefined,
	size: CheckBoxSize
) =>
	clsx(
		disableVariant === 'all' && disabled ? 'opacity-30 pointer-events-none' : 'cursor-pointer',
		typeof label === 'string' &&
			(size === 'large'
				? 'text-body pt-1'
				: size === 'medium'
				? 'text-paragraph pt-0.5'
				: size === 'small'
				? 'text-caption1 pt-0.5'
				: size === 'x-small'
				? 'text-caption1'
				: ''),
		hasError ? 'text-red-500' : ''
	);

export default {
	container,
	checkboxWrapper,
	checkbox,
	icon,
	label,
};
