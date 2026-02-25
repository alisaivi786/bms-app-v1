import clsx from 'clsx';
import { ComponentSize, RadioCardVariant } from '@devkit/utilities';

const container = (dir: 'col' | 'row', variant?: RadioCardVariant) => {
	const direction = dir === 'col' ? 'flex-col' : 'flex-row';

	if (variant === 'filled') {
		return clsx('flex p-0.5', direction, 'gap-1', 'rounded-md bg-gray-100');
	}

	return clsx('flex gap-4', direction);
};

const cardContainer = (
	toggled: boolean,
	className?: string,
	hasErrors?: boolean,
	dir?: 'col' | 'row',
	size?: ComponentSize,
	isDisabled?: boolean,
	variant?: RadioCardVariant
) =>
	clsx(
		dir === 'row' ? 'flex-1' : '',

		'p-4 rounded-md gap-2 items-center justify-center',

		variant === 'filled' ? (toggled ? 'bg-white shadow rounded-md' : '') : '',

		variant === 'filled-gray'
			? `rounded-full border ${toggled ? 'bg-gray-600 border-gray-600' : 'bg-gray-50 border-gray-200'}`
			: '',

		variant === 'filled-dark'
			? `rounded-full border ${toggled ? 'bg-black border-dark' : 'bg-gray-50 border-gray-200'}`
			: '',

		!variant || variant === 'primary' || variant === 'checkmarks'
			? `rounded-md border-solid border-2 ${
					toggled ? `nj-radio-button-selected ${variant === 'checkmarks' && 'bg-brand-50'}` : 'nj-radio-button'
			  }`
			: '',

		variant === 'checkmarks' && 'rounded-xl',
		hasErrors && 'border-red-500 bg-red-50 ',
		size === 'small' ? 'px-4 py-1' : size === 'medium' ? 'px-4 py-3' : 'p-4',
		isDisabled ? ' opacity-50' : '',
		variant !== 'checkmarks' && dir === 'row' ? 'px-0' : '',
		'nj-radio-card-item-container-font-family',
		className
	);

const content = (reverseLayout: boolean, center = false, variant?: RadioCardVariant) =>
	`flex w-full ${reverseLayout ? 'flex-row-reverse' : 'flex-row'} items-center ${
		center ? 'justify-center' : 'justify-start'
	} nj-radio-content ${variant === 'checkmarks' && 'justify-between'}`;

const rightContent = (reverseLayout: boolean) =>
	clsx(` ${reverseLayout ? 'flex-row-reverse' : 'flex-row'} items-center`);

const label = (isRtlLocale: boolean, variant?: RadioCardVariant, toggled?: boolean, dir?: 'col' | 'row') =>
	clsx(
		`nj-radio-label-font-family nj-radio-label-font-size nj-radio-label-horizontal-padding ${
			isRtlLocale ? 'text-right' : 'text-left'
		}`,
		(variant === 'filled-gray' || variant === 'filled-dark') && toggled ? 'text-white' : 'text-black',

		variant === 'filled' ? (toggled ? 'font-main-bold' : 'font-main-regular') : '',

		variant === 'filled-gray' || variant === 'filled-dark' ? 'font-main-regular' : '',

		variant === 'filled-gray' || variant === 'filled-dark' || variant === 'filled'
			? `text-center ${dir === 'row' ? 'px-0' : ''}`
			: ''
	);

const placeholder = (isRtlLocale: boolean, variant?: RadioCardVariant, toggled?: boolean) =>
	clsx(
		`text-body text-gray-900 ${isRtlLocale ? 'text-right' : 'text-left'}`,
		(variant === 'filled-gray' || variant === 'filled-dark') && toggled ? 'text-white' : 'text-gray-900'
	);

const checkmarkIcon = (isSelected: boolean) =>
	clsx('nj-radio-checkmark-icon', isSelected ? 'text-blue-500' : 'text-gray-400');

const icon = (size?: ComponentSize, variant?: RadioCardVariant, toggled?: boolean) =>
	clsx(
		size === 'small' || size === 'medium' ? 'w-4 h-4' : 'nj-radio-icon',
		(variant === 'filled-gray' || variant === 'filled-dark') && toggled ? 'text-white' : 'text-black'
	);

const descriptionClassNames = clsx('flex w-full pt-1.5 text-gray-600 font-main-medium text-caption1');

export default {
	cardContainer,
	container,
	content,
	label,
	placeholder,
	checkmarkIcon,
	rightContent,
	icon,
	descriptionClassNames,
};
