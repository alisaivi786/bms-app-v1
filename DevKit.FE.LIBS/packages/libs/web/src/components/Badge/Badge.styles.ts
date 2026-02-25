import clsx from 'clsx';

export type TVariant = 'Default' | 'Accent' | 'AccentRounded' | 'DefaultRounded';

export type Status = 'Success' | 'Neutral' | 'Warning' | 'Critical' | 'Info' | 'NeutralGrey' | 'NeutralLightGray';

export type Size = 'Small' | 'Large';
const badgeTitle = (size: Size) =>
	clsx('font-bold', size === 'Small' && 'text-legal', size === 'Large' && 'text-caption1 leading-4');

const badgeIcon = (variant: TVariant, size: Size) => clsx(
	size === 'Small' ? 'text-legal' : (
		variant === 'DefaultRounded' ? 'text-body' : 'text-paragraph'));

const badgeContainer = (variant: TVariant, status: Status, size: Size) =>
	clsx(
		'inline-flex items-center gap-1.5 whitespace-nowrap text-center border',
		variant === 'Default' && [
			'rounded-md text-black', size === 'Large' && 'px-2.5 py-1',
			status === 'Critical' && 'bg-red-100 border-red-100',
			status === 'Warning' && 'bg-yellow-100 border-yellow-100',
			status === 'Info' && 'bg-brand-100 border-brand-100',
			status === 'Success' && 'bg-green-100 border-green-100',
			status === 'Neutral' && 'bg-white border-gray-200',
			status === 'NeutralGrey' && 'bg-gray-100 border-gray-100',
			status === 'NeutralLightGray' && 'bg-gray-600 border-gray-600',
		],
		variant === 'Accent' && [
			'rounded-md text-white', size === 'Large' && 'px-2.5 py-1',
			status === 'Critical' && 'bg-red-500 border-red-500',
			status === 'Warning' && 'bg-yellow-500 border-yellow-500',
			status === 'Info' && 'nj-bg-brand nj-border-brand',
			status === 'Success' && 'bg-green-500 border-green-500',
			status === 'Neutral' && 'bg-white !text-black border-gray-200',
			status === 'NeutralGrey' && 'bg-gray-800 border-gray-800',
			status === 'NeutralLightGray' && 'bg-gray-600 border-gray-600',
		],
		variant === 'AccentRounded' && [
			'rounded-2xl text-white', size === 'Large' && 'px-2.5 py-1',
			status === 'Critical' && 'bg-red-500 border-red-500',
			status === 'Warning' && 'bg-yellow-500 border-yellow-500',
			status === 'Info' && 'nj-bg-brand nj-border-brand',
			status === 'Success' && 'bg-green-500 border-green-500',
			status === 'Neutral' && 'bg-white !text-black border-gray-200',
			status === 'NeutralGrey' && 'bg-gray-800 border-gray-800',
			status === 'NeutralLightGray' && 'bg-gray-600 border-gray-600',
		],
		variant === 'DefaultRounded' && [
			'rounded-2xl text-black', size === 'Large' && 'px-2 py-1',
			status === 'Critical' && 'bg-red-100 border-red-100',
			status === 'Warning' && 'bg-yellow-100 border-yellow-100',
			status === 'Info' && 'bg-brand-100 border-brand-100',
			status === 'Success' && 'bg-green-100 border-green-100',
			status === 'Neutral' && 'bg-white border-gray-200',
			status === 'NeutralGrey' && 'bg-gray-100 border-gray-100',
			status === 'NeutralLightGray' && 'bg-gray-600 border-gray-600',
		],
		size === 'Small' && 'px-1 py-0.5'
	);

export default {
	badgeTitle,
	badgeIcon,
	badgeContainer,
};
