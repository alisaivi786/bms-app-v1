import clsx from 'clsx';
import { ComponentSize } from '@devkit/utilities';

const container = 'flex-row w-full gap-x-1 gap-y-1 flex-wrap';

const containerScrollable = 'w-full';

const containerScrollableContent = 'flex-row gap-x-2';

const button = (
	size: ComponentSize,
	isSelected: boolean,
	variant: 'gray' | 'dark' = 'gray',
	disabled: boolean,
	hasErrors: boolean
) =>
	clsx(
		'justify-center items-center border px-3 flex-row',
		disabled && 'opacity-60',
		hasErrors && 'border-red-500 bg-red-50',
		!hasErrors &&
			(variant === 'gray'
				? isSelected
					? 'bg-gray-600 border-gray-600'
					: 'bg-white border-gray-200 border-gray-200'
				: isSelected
				? 'bg-black border-black'
				: 'bg-white border-gray-200'),
		size === 'small' ? 'rounded-3xl h-6' : size === 'medium' ? 'rounded-4xl h-8' : 'rounded-5xl h-10'
	);

const label = (size: ComponentSize, isSelected: boolean, hasErrors: boolean) =>
	clsx('text-caption1', hasErrors && 'text-red-500', isSelected && 'text-white', size === 'large' && 'text-paragraph');

const descriptionClassNames = clsx('flex w-11/12 pt-2 font-main-regular text-caption1');

export default {
	button,
	container,
	containerScrollable,
	containerScrollableContent,
	label,
	descriptionClassNames,
};
