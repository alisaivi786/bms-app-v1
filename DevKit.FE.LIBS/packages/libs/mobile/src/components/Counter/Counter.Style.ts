import clsx from 'clsx';
import { ComponentSize } from '@devkit/utilities';

const CounterContainer = (size: ComponentSize, isRtlLocale?: boolean) =>
	clsx(
		'border items-center rounded border-gray-400',
		isRtlLocale ? 'flex-row-reverse' : 'flex-row',
		size === 'small' && 'h-6',
		size === 'medium' && 'h-8',
		size === 'large' && 'h-10'
	);

const iconContainer = (size: ComponentSize) =>
	clsx(
		'p-1.5 items-center justify-center text-gray-400',
		size === 'small' && 'w-6 h-6',
		size === 'medium' && 'w-8 h-8',
		size === 'large' && 'w-10 h-10'
	);

const valueContainer = (size: ComponentSize) =>
	clsx(
		'border border-gray-400 items-center justify-center select-none',
		size === 'small' && 'w-6 h-6',
		size === 'medium' && 'w-8 h-8',
		size === 'large' && 'w-10 h-10'
	);

const valueLabel = (size: ComponentSize) =>
	clsx('text-black', 'font-main-regular select-none text-caption1', size === 'large' && 'text-body');

const icon = (disabled?: boolean) => clsx(disabled ? 'opacity-50' : '');

export default { CounterContainer, iconContainer, valueContainer, valueLabel, icon };
