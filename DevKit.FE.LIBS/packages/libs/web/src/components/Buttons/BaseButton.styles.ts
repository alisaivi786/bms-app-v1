import clsx from 'clsx';
import includes from 'lodash/includes';
import { TwLayoutClassName } from '@devkit/utilities';
import { ButtonSize, ButtonState, ButtonVariants } from './types';

const button = (
	layoutClassName: TwLayoutClassName | undefined,
	variant: ButtonVariants,
	isDisabled: boolean,
	showOutline: boolean,
	size: ButtonSize,
	state: ButtonState,
	isLoading: boolean | undefined
) => {
	return clsx(
		'whitespace-nowrap leading-none font-medium flex border items-center cursor-pointer',
		[
			includes<ButtonVariants>(['primary', 'iconPrimary'], variant) && [
				!isDisabled && [
					!state && [
						'text-white',
						!isLoading &&
							'nj-border-brand nj-bg-brand hover:nj-bg-brand-hover hover:nj-button-border-hover nj-button-shadow',
						isLoading && 'nj-bg-brand-hover nj-button-border-hover',
					],
					state === 'danger' && [
						'text-white',
						!isLoading && 'border-red-500 bg-red-500 hover:bg-red-700 hover:border-red-700',
						isLoading && 'bg-red-300 border-red-300',
					],
					state === 'success' && [
						'text-white',
						!isLoading && 'border-green-500 bg-green-500 hover:bg-green-700 hover:border-green-700',
						isLoading && 'bg-green-300 border-green-300',
					],
				],
				isDisabled && 'border-gray-200 nj-disabled-button-color text-gray-400',
			],
			includes<ButtonVariants>(['secondary', 'iconSecondary'], variant) && [
				'bg-white',
				!isDisabled && [
					!state && [
						!isLoading &&
							'nj-secondary-button hover:nj-secondary-button-border-hover hover:nj-text-button-hover hover:nj-secondary-button-opacity-hover',
						isLoading && 'nj-button-border-hover nj-text-button-hover ',
					],
					state === 'danger' && [
						!isLoading && 'border-red-500 text-red-500 hover:text-red-700 hover:border-red-700',
						isLoading && 'text-red-300 border-red-300',
					],
					state === 'success' && [
						!isLoading && 'border-green-500 text-green-500 hover:text-green-700 hover:border-green-700',
						isLoading && 'text-green-300 border-green-300',
					],
				],
				isDisabled && 'border-gray-400 text-gray-400',
			],
			includes<ButtonVariants>(['social'], variant) && [
				'bg-white',
				!isDisabled && [
					!state && [
						!isLoading && 'border-black text-black hover:bg-brand-50 ',
						isLoading && 'border-black nj-text-black ',
					],
				],
				isDisabled && 'border-gray-400 text-gray-400',
			],
			includes<ButtonVariants>(['text', 'iconText'], variant) && [
				'border-transparent',
				!isDisabled && [
					!state && [!isLoading && 'nj-text-brand hover:nj-text-brand-hover ', isLoading && 'nj-text-brand-hover '],
					state === 'danger' && [!isLoading && 'text-red-500 hover:text-red-700', isLoading && 'text-red-300'],
					state === 'success' && [!isLoading && 'text-green-500 hover:text-green-700', isLoading && 'text-green-300'],
				],
				isDisabled && 'text-gray-400',
			],
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary'], variant) && 'rounded-full',
			includes<ButtonVariants>(['primary', 'secondary', 'social'], variant) && 'nj-button-border-radius',
		],
		size === 'xSmall' && [
			'text-caption1',
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-6 w-6',
			includes<ButtonVariants>(['primary', 'secondary', 'text', 'social'], variant) && 'px-2 py-1.5 h-6',
		],
		size === 'small' && [
			'text-paragraph',
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-8 w-8',
			includes<ButtonVariants>(['primary', 'secondary', 'text', 'social'], variant) && 'px-3 py-1.5 h-8',
		],
		size === 'medium' && [
			'nj-button-font-size',
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-10 w-10',
			includes<ButtonVariants>(['primary', 'secondary', 'text', 'social'], variant) && 'px-4 py-2.5 h-10',
		],
		size === 'large' && [
			'nj-button-font-size',
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-12 w-12',
			includes<ButtonVariants>(['primary', 'secondary', 'text', 'social'], variant) && 'px-4 py-3 h-12',
		],
		showOutline && '!outline !outline-3 !outline-brand-30',
		layoutClassName
	);
};

const container = 'flex w-full items-center justify-center cursor-pointer relative';

const childrenContainer = (hasChildren: boolean, isLoading: boolean, isIcon: boolean, variant: ButtonVariants) =>
	clsx(
		'flex relative w-full items-center justify-center cursor-pointer',
		hasChildren && !isIcon && 'gap-2',
		isLoading && 'invisible',
		variant === 'social' && 'font-bold'
	);

const spinnerStyle = 'absolute';

export default {
	button,
	container,
	childrenContainer,
	spinnerStyle,
};
