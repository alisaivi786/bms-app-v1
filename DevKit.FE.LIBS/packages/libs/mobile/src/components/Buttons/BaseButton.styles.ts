import clsx from 'clsx';
import includes from 'lodash/includes';
import { TwLayoutClassName } from '@devkit/utilities';
import { ButtonSize, ButtonVariants } from './types';

const button = (
	layoutClassName: TwLayoutClassName | undefined,
	variant: ButtonVariants,
	isDisabled: boolean,
	showOutline: boolean,
	state: 'danger' | undefined,
	isLoading: boolean | undefined,
	pressed: boolean | undefined
) => {
	return clsx(
		'font-main-medium justify-center items-center border nj-button-pressable',
		[
			includes<ButtonVariants>(['primary', 'iconPrimary'], variant) && [
				!isDisabled && [
					state !== 'danger' && [
						!pressed && [
							!isLoading && 'nj-border-brand nj-primary-button-bg',
							isLoading && 'nj-bg-brand-pressed nj-border-brand-pressed',
						],
						pressed && ['nj-bg-brand-pressed nj-border-brand-pressed'],
					],
					state === 'danger' && [
						!pressed && [!isLoading && 'border-red-500 bg-red-500', isLoading && 'bg-red-300 border-red-300'],
						pressed && 'bg-red-300 border-red-300',
					],
				],
				isDisabled && 'border-gray-200 bg-gray-200',
			],
			includes<ButtonVariants>(['secondary', 'iconSecondary'], variant) && [
				'nj-bg-secondary',
				!isDisabled && [
					state !== 'danger' && [
						!isLoading && 'nj-border-secondary nj-secondary-button-bg',
						isLoading && 'nj-border-brand-pressed nj-text-brand-pressed',
					],
					state === 'danger' && [
						!isLoading && 'border-red-500 text-red-500',
						isLoading && 'text-red-300 border-red-300',
					],
				],
				isDisabled && 'border-gray-400 text-gray-400',
			],
			includes<ButtonVariants>(['social'], variant) && [
				'bg-white',
				!isDisabled && [
					state !== 'danger' && [
						!isLoading && 'nj-social-button-border nj-social-button-text',
						isLoading && 'border-black nj-text-black',
					],
				],
				isDisabled && 'border-gray-400 text-gray-400',
			],
			includes<ButtonVariants>(['text', 'iconText'], variant) && [
				'border-transparent',
				!isDisabled && [
					state !== 'danger' && [!isLoading && 'nj-text-brand', isLoading && 'nj-text-brand-pressed'],
					state === 'danger' && [!isLoading && 'text-red-500', isLoading && 'text-red-300'],
				],
				isDisabled && 'text-gray-400',
			],
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary'], variant) && 'rounded-full',
			includes<ButtonVariants>(['primary', 'secondary'], variant) && 'nj-border-radius',
			includes<ButtonVariants>(['social'], variant) && 'nj-social-button-border-radius',
		],
		showOutline && '!outline !outline-3 !outline-brand-30',
		layoutClassName
	);
};

const container = (size: ButtonSize, variant: ButtonVariants) =>
	clsx(
		'flex w-full items-center justify-center relative',
		includes<ButtonVariants>(['secondary', 'iconSecondary'], variant) && 'nj-secondary-button-bg',
		size === 'xSmall' && [
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-6 w-6',
			includes<ButtonVariants>(['primary', 'secondary', 'text', 'social'], variant) &&
				'nj-button-container-padding-xsmall',
		],
		size === 'small' && [
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-8 w-8',
			includes<ButtonVariants>(['primary', 'secondary', 'text', 'social'], variant) &&
				'nj-button-container-padding-small',
		],
		size === 'medium' && [
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-10 w-10',
			includes<ButtonVariants>(['primary', 'secondary', 'text', 'social'], variant) &&
				'nj-button-container-padding-medium',
		],
		size === 'large' && [
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-12 w-12',
			includes<ButtonVariants>(['primary', 'secondary', 'text', 'social'], variant) &&
				'nj-button-container-padding-large',
		]
	);

const childrenContainer = (hasChildren: boolean, isIcon: boolean, variant: ButtonVariants) =>
	clsx(
		'flex flex-row relative items-center justify-center',
		hasChildren && !isIcon && 'gap-2',
		variant === 'social' && 'font-main-bold'
	);

const spinnerStyle = (variant: ButtonVariants, state: 'danger' | undefined, disabled: boolean) =>
	clsx(
		'absolute z-50 left-0 right-0 items-center justify-center',
		state && 'bg-red-500',
		disabled && 'bg-gray-200',
		includes<ButtonVariants>(['primary', 'iconPrimary'], variant) &&
			state !== 'danger' &&
			!disabled &&
			'nj-button-spinner-bg-primary',
		includes<ButtonVariants>(['primary', 'iconPrimary'], variant) && state === 'danger' && !disabled && 'bg-red-300',
		includes<ButtonVariants>(['secondary', 'iconSecondary', 'social'], variant) && 'nj-button-spinner-bg-secondary'
	);

const text = (
	variant: ButtonVariants,
	state: 'danger' | undefined,
	disabled: boolean,
	isLoading: boolean,
	size: ButtonSize
) =>
	clsx(
		includes<ButtonVariants>(['primary', 'iconPrimary'], variant) && [
			'nj-primary-button-text nj-button-text-font',
			disabled && 'text-gray-400',
			isLoading && 'text-transparent',
		],
		includes<ButtonVariants>(['secondary', 'iconSecondary'], variant) && [
			'nj-secondary-button-text nj-button-text-font',
			!!state && 'text-red-500',
			disabled && 'text-gray-400',
			isLoading && 'text-transparent',
		],
		includes<ButtonVariants>(['social'], variant) && [
			'nj-social-button-text nj-button-text-font',
			!!state && 'text-red-500',
			disabled && 'text-gray-400',
			isLoading && 'text-transparent',
		],
		includes<ButtonVariants>(['text'], variant) && [
			'nj-text-button-text nj-button-text-font',
			!!state && 'text-red-500',
			disabled && 'text-gray-400',
			isLoading && 'text-transparent',
		],
		size === 'xSmall' && [
			'text-caption1',
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-6 w-6',
		],
		size === 'small' && [
			'text-paragraph',
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-8 w-8',
		],
		size === 'medium' && [
			'text-body',
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-10 w-10',
		],
		size === 'large' && [
			'text-body',
			includes<ButtonVariants>(['iconPrimary', 'iconSecondary', 'iconText'], variant) && 'h-12 w-12',
		],
		includes<ButtonVariants>(['social'], variant) && [
			!disabled && [state !== 'danger' && [!isLoading && 'text-black', isLoading && 'nj-text-black']],
			disabled && 'text-gray-400',
		]
	);

const iconSize = (variant: ButtonVariants, size: ButtonSize) => {
	if (variant === 'social') {
		return 12;
	}
	switch (size) {
		case 'xSmall':
			return 12;
		case 'small':
			return 16;
		case 'medium':
			return 20;
		case 'large':
			return 24;
	}
};

export default {
	button,
	container,
	childrenContainer,
	spinnerStyle,
	text,
	iconSize,
};
