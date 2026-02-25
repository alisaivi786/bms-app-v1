import clsx from 'clsx';
import { ComponentSize } from '@devkit/utilities';

const CounterContainer = (size: ComponentSize, isRtlLocale?: boolean) =>
	clsx(
		'border inline-flex flex-row items-center rounded border-gray-400',
		isRtlLocale ? 'flex-row-reverse' : 'flex-row',
		size === 'small' && 'h-6',
		size === 'medium' && 'h-8',
		size === 'large' && 'h-10'
	);

const iconContainer = (size: ComponentSize, disabled?: boolean) =>
	clsx(
		disabled ? 'cursor-not-allowed' : 'cursor-pointer',
		'p-1.5 flex items-center justify-center text-gray-400',
		size === 'small' && 'w-6 h-6',
		size === 'medium' && 'w-8 h-8',
		size === 'large' && 'w-10 h-10'
	);

const valueContainer = (size: ComponentSize, disabled?: boolean) =>
	clsx(
		disabled ? 'text-gray-400' : 'text-brand-600',
		'border-x border-gray-400 flex items-center justify-center text-brand-600 font-normal select-none',
		size === 'small' && 'w-6 h-6 text-caption1',
		size === 'medium' && 'w-8 h-8',
		size === 'large' && 'w-10 h-10'
	);

const icon = (disabled?: boolean) => clsx(disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer');

export default { CounterContainer, iconContainer, valueContainer, icon };
