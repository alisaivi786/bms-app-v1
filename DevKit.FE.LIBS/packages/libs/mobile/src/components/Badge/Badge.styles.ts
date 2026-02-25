import clsx from 'clsx';

export type TVariant = 'Default' | 'Accent' | 'AccentRounded' | 'DefaultRounded' | 'Outline' | 'OutlineRounded';

export type Size = 'Small' | 'Large';

export type Status = 'Success' | 'Neutral' | 'Warning' | 'Critical' | 'Info' | 'NeutralGrey' | 'NeutralLightGray';
const badgeTitle = (variant: TVariant, status: Status, reverseLayout: boolean) =>
	clsx(
		'text-caption1 font-main-bold text-white max-w-93/100',
		`${reverseLayout ? '' : 'text-left'}`,
		(variant === 'Default' ||
			status === 'Neutral' ||
			variant === 'DefaultRounded' ||
			variant === 'Outline' ||
			variant === 'OutlineRounded') &&
			' text-black',
		(variant === 'Outline' || variant === 'OutlineRounded') && ' font-normal'
	);

const badgeIcon = (variant: TVariant, status: Status) =>
	clsx(
		'text-caption1 text-white',
		(variant === 'Default' || status === 'Neutral' || variant === 'DefaultRounded') && ' text-black',
		(variant === 'Outline' || variant === 'OutlineRounded') && status === 'Critical' && ' text-red-500',
		(variant === 'Outline' || variant === 'OutlineRounded') && status === 'Warning' && ' text-yellow-500',
		(variant === 'Outline' || variant === 'OutlineRounded') && status === 'Info' && ' text-black',
		(variant === 'Outline' || variant === 'OutlineRounded') && status === 'Success' && ' text-green-500',
		(variant === 'Outline' || variant === 'OutlineRounded') && status === 'NeutralGrey' && ' text-gray-800',
		(variant === 'Outline' || variant === 'OutlineRounded') && status === 'NeutralLightGray' && ' text-gray-600'
	);

const badgeContainer = (variant: TVariant, status: Status, size: Size) =>
	clsx(
		'flex-row items-center gap-1.5 px-2.5 py-0.5 border',
		variant === 'Default' && [
			'rounded-md',
			status === 'Critical' && 'bg-red-100 border-red-100',
			status === 'Warning' && 'bg-yellow-100 border-yellow-100',
			status === 'Info' && 'bg-brand-100 border-brand-100',
			status === 'Success' && 'bg-green-100 border-green-100',
			status === 'Neutral' && 'bg-white border-gray-200',
			status === 'NeutralGrey' && 'bg-gray-100 border-gray-100',
			status === 'NeutralLightGray' && 'bg-gray-600 border-gray-600',
		],
		variant === 'Accent' && [
			'rounded-md',
			status === 'Critical' && 'bg-red-500 border-red-500',
			status === 'Warning' && 'bg-yellow-500 border-yellow-500',
			status === 'Info' && 'nj-bg-brand nj-border-brand',
			status === 'Success' && 'bg-green-500 border-green-500',
			status === 'Neutral' && 'bg-white border-gray-200',
			status === 'NeutralGrey' && 'bg-gray-800 border-gray-800',
			status === 'NeutralLightGray' && 'bg-gray-600 border-gray-600',
		],
		variant === 'Outline' && [
			'rounded-md',
			status === 'Critical' && 'bg-white border-red-500',
			status === 'Warning' && 'bg-white border-yellow-500',
			status === 'Info' && 'bg-white border-brand',
			status === 'Success' && 'bg-white border-green-500',
			status === 'Neutral' && 'bg-white border-gray-200',
			status === 'NeutralGrey' && 'bg-white border-gray-800',
			status === 'NeutralLightGray' && 'bg-white border-gray-600',
		],
		variant === 'AccentRounded' && [
			'rounded-2xl',
			status === 'Critical' && 'bg-red-500 border-red-500',
			status === 'Warning' && 'bg-yellow-500 border-yellow-500',
			status === 'Info' && 'nj-bg-brand nj-border-brand',
			status === 'Success' && 'bg-green-500 border-green-500',
			status === 'Neutral' && 'bg-white border-gray-200',
			status === 'NeutralGrey' && 'bg-gray-800 border-gray-800',
			status === 'NeutralLightGray' && 'bg-gray-600 border-gray-600',
		],
		variant === 'DefaultRounded' && [
			'rounded-2xl',
			status === 'Critical' && 'bg-red-100 border-red-100',
			status === 'Warning' && 'bg-yellow-100 border-yellow-100',
			status === 'Info' && 'bg-brand-100 border-brand-100',
			status === 'Success' && 'bg-green-100 border-green-100',
			status === 'Neutral' && 'bg-white border-gray-200',
			status === 'NeutralGrey' && 'bg-gray-100 border-gray-100',
			status === 'NeutralLightGray' && 'bg-gray-600 border-gray-600',
		],
		variant === 'OutlineRounded' && [
			'rounded-2xl',
			status === 'Critical' && 'bg-white border-red-500',
			status === 'Warning' && 'bg-white border-yellow-500',
			status === 'Info' && 'bg-white border-brand',
			status === 'Success' && 'bg-white border-green-500',
			status === 'Neutral' && 'bg-white border-gray-200',
			status === 'NeutralGrey' && 'bg-white border-gray-800',
			status === 'NeutralLightGray' && 'bg-white border-gray-600',
		],
		size === 'Large' && 'py-1'
	);

export default {
	badgeTitle,
	badgeIcon,
	badgeContainer,
};
