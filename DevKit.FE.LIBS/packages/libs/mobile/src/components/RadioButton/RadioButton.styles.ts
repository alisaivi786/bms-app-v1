import clsx from 'clsx';
import { RadioBoxSize } from '@devkit/utilities';

const isHasErrorStyles = (isChecked: boolean) => ({
	true: `${isChecked ? 'border-red-500 text-red-500' : 'bg-gray-100 border-red-500'}`,
	false: `${isChecked ? 'nj-border-brand nj-text-brand-pressed' : 'bg-gray-100 border-gray-600'}`,
});

const getRadioContainerStyles = (highlighted?: boolean, widthFull?: boolean, hasAnyHighlighted?: boolean) =>
	clsx(
		'flex-row items-center',
		highlighted && 'rounded-md bg-brand-200',
		(hasAnyHighlighted || highlighted) && 'p-2.5',
		widthFull ? 'flex-shrink-1' : 'flex-shrink-1'
	);

const getRadioButtonWrapperStyles = () => clsx('relative justify-center items-center');

const getRadioButtonStyles = (
	size: RadioBoxSize,
	isChecked: boolean,
	hasErrors: boolean,
	disabled?: boolean,
	active?: boolean
) =>
	clsx(
		'flex items-center justify-center rounded-full border border-solid relative',
		disabled ? 'opacity-30' : '',
		isHasErrorStyles(isChecked)[`${hasErrors}` as 'true' | 'false'],
		size === 'x-small' && ['h-4 w-4'],
		size === 'small' && ['h-5 w-5'],
		size === 'medium' && ['h-6 w-6'],
		size === 'large' && ['h-8 w-8'],
		active && hasErrors && 'border-red-500',
		active && !hasErrors && 'nj-border-brand'
	);

const getBubbleStyles = (size: RadioBoxSize, hasErrors: boolean) =>
	clsx(
		'absolute rounded-full',
		hasErrors ? 'bg-red-500' : 'nj-bg-brand',
		size === 'x-small' && 'h-[30px] w-[30px]',
		size === 'small' && 'h-10 w-10',
		size === 'medium' && 'h-11 w-11',
		size === 'large' && 'h-12 w-12',
		'opacity-30'
	);

const getCheckIconStyles = (size: RadioBoxSize, hasErrors: boolean) =>
	clsx(
		'w-full h-full rounded-full border-gray-100',
		hasErrors ? 'bg-red-500' : 'nj-bg-brand',
		size === 'x-small' && ['h-[10px]', 'w-[10px]'],
		size === 'small' && ['h-[14px]', 'w-[14px]'],
		size === 'medium' && ['h-[16px]', 'w-[16px]'],
		size === 'large' && ['h-[24px]', 'w-[24px]']
	);

const getLabelContainerStyles = (size: RadioBoxSize) =>
	clsx('flex-row items-center ', size === 'large' ? 'gap-4' : 'gap-3');

const getLabelStyles = (size: RadioBoxSize, disabled?: boolean) =>
	clsx(
		'font-main-regular flex-shrink-1',
		disabled ? 'opacity-30' : '',
		size === 'large' ? 'text-body' : size === 'medium' ? 'text-paragraph' : 'text-caption1'
	);

const getRadioButtonGroupContainerStyles = () => {
	return 'flex flex-row flex-wrap w-full';
};

const getRadioButtonGroupItemStyles = () => {
	return 'p-1';
};

const getRadioButtonGroupDescriptionStyles = () => {
	return 'nj-error-text-font-size text-gray-500 mt-2';
};

export default {
	getRadioButtonStyles,
	getRadioContainerStyles,
	getRadioButtonWrapperStyles,
	getBubbleStyles,
	getCheckIconStyles,
	getLabelContainerStyles,
	getLabelStyles,
	isHasErrorStyles,
	getRadioButtonGroupContainerStyles,
	getRadioButtonGroupItemStyles,
	getRadioButtonGroupDescriptionStyles,
};
