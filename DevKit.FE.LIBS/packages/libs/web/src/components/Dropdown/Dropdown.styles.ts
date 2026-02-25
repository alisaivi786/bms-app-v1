import clsx from 'clsx';
import { ComponentSize } from '@devkit/utilities/src/types/Forms/Common';

const mainContainer = 'w-full flex-1';

const menuContainerStyle = (size: ComponentSize) =>
	clsx(
		'absolute flex flex-col w-full py-1 bg-white border border-gray-500 rounded-md shadow-card max-h-80',
		size !== 'large' && 'top-12',
		size === 'large' && 'top-16'
	);

const valueStyles = (disabled: boolean, isInvalid: boolean, size: ComponentSize) =>
	clsx(
		'absolute top-px start-px h-full flex items-center w-full max-w-max overflow-hidden',
		'background-transparent',
		size === 'small' && 'px-2 text-paragraph',
		size !== 'small' && 'px-4',
		isInvalid && 'text-red-500',
		disabled && '!bg-gray-60 rounded-s-md border-e-0 text-gray-500'
	);

const groupLabelStyle = 'bg-gray-100 text-paragraph px-2.5 uppercase py-2';

const multipleOptionStyle = (size: ComponentSize, isDisabled?: boolean) =>
	clsx(
		'border-b last:border-none !outline-none cursor-pointer flex w-full gap-2',
		size !== 'small' && 'py-3 px-4',
		size === 'small' && 'py-1.5 px-2 text-paragraph',
		isDisabled && 'bg-gray-100',
		!isDisabled && 'hover:bg-brand-50'
	);

const defaultOptionStyle = 'flex items-center justify-center text-gray-600 py-4';

const menuFooterStyle = 'w-full flex flex-wrap justify-end sticky bottom-0 border-t w-full gap-5 px-5 py-4 bg-white';

const singleDropdownOptionStyles = {
	container: (selected: boolean, focused: boolean, size: ComponentSize, isDisabled?: boolean) =>
		clsx([
			'border-b last:border-none cursor-pointer',
			size !== 'small' && 'py-3 px-4',
			size === 'small' && 'py-1.5 px-2 text-paragraph',
			selected && '!nj-bg-brand text-white',
			focused && 'bg-brand-50',
			isDisabled && 'bg-gray-100 opacity-30',
			!isDisabled && 'hover:bg-brand-50',
		]),
	label: 'flex-1',
};

export default {
	mainContainer,
	menuContainerStyle,
	valueStyles,
	groupLabelStyle,
	defaultOptionStyle,
	menuFooterStyle,
	multipleOptionStyle,
	singleDropdownOptionStyles,
};
