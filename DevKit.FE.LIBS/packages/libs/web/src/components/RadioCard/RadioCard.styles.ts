import clsx from 'clsx';
import { ComponentSize, RadioCardVariant } from '@devkit/utilities';

const container = (dir: 'col' | 'row', columnsCount?: number, variant?: RadioCardVariant, size?: ComponentSize) => {
	if (columnsCount && columnsCount > 1) {
		return clsx('grid gap-4', `grid-cols-${columnsCount}`);
	}

	const direction = dir === 'col' ? 'flex-col' : 'flex-row';
	const gap = size === 'small' ? 'gap-1' : 'gap-4';

	if (variant === 'filled') {
		return clsx(
			'flex p-0.5 min-w-fit',
			direction,
			'gap-1',
			'rounded-md [background:var(--nj-tabNavigation-list-style-bg,var(--nj-color-gray-100))]'
		);
	}

	return clsx('flex', gap, direction);
};

const cardContainer = (
	toggled: boolean,
	className?: string,
	hasErrors?: boolean,
	size?: ComponentSize,
	isDisabled?: boolean,
	variant?: RadioCardVariant
) => {
	return clsx(
		'flex border-solid w-full cursor-pointer transition-colors duration-200 ease-in-out',

		variant === 'filled' ? (toggled ? 'bg-white font-bold shadow rounded-md' : 'font-normal') : '',

		variant === 'filled-gray' ? `rounded-full border text-center ${toggled ? 'bg-gray-600 font-normal border-gray-600' : 'font-normal border-gray-200'}` : '',

		variant === 'filled-dark' ? `rounded-full border text-center ${toggled ? 'bg-black font-normal border-dark' : 'font-normal border-gray-200'}` : '',

		(!variant || variant === 'primary' || variant === 'checkmarks') ? `rounded-md font-bold ${toggled ? 'nj-radio-button-selected' : 'nj-radio-button'}` : '',

		className,
		hasErrors && '!bg-red-50 !border-red-500',
		size === 'small' ? 'px-3 py-1' : size === 'medium' ? 'px-4 py-3' : 'p-4',
		isDisabled ? ' opacity-50' : ''
	);
};

const cardBox = 'flex w-full gap-2 items-center border-transparent';

const wrapper = (center?: boolean) => clsx(`flex grow items-center gap-2 ${center ? 'justify-center' : ''}`);
const body = 'flex flex-col gap-1 items-start';
const label = (size?: ComponentSize, variant?: RadioCardVariant, isActive?: boolean) =>
	clsx(
		size === 'small' ? 'text-caption1' : 'text-paragraph',
		(variant === 'filled-gray' || variant === 'filled-dark') && isActive ? 'text-white' : 'text-black',
		size === 'small' || size === 'medium' ? 'leading-tight' : 'leading-normal'
	);
const placeholder = (variant?: RadioCardVariant, isActive?: boolean, size?: ComponentSize) =>
	clsx(
		'leading-tight',
		size === 'small' ? 'text-paragraph' : 'text-body',
		(variant === 'filled-gray' || variant === 'filled-dark') && isActive ? 'text-white' : 'text-gray-900'
	);

const icon = (size?: ComponentSize, variant?: RadioCardVariant, isActive?: boolean) =>
	clsx(
		size === 'small' || size === 'medium' ? 'w-4 h-4' : 'w-6 h-6',
		(variant === 'filled-gray' || variant === 'filled-dark') && isActive ? 'text-white' : ''
	);
const descriptionClassNames = 'flex w-full pt-1.5 text-gray-600 font-medium text-caption1';

export default {
	cardBox,
	cardContainer,
	container,
	wrapper,
	body,
	label,
	placeholder,
	icon,
	descriptionClassNames,
};
