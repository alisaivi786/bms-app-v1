import clsx from 'clsx';
import { TwLinkClassName } from '@devkit/utilities';

const linkStyle = (className: undefined | TwLinkClassName, disabled?: boolean, variant?: 'primary' | 'inverse') =>
	clsx(
		'inline-flex items-center justify-between gap-1 align-top cursor-pointer',
		disabled && 'text-gray-500 !cursor-default',
		!disabled &&
			(variant === 'inverse' ? 'text-white hover:text-brand-400' : 'nj-text-brand hover:nj-text-brand-hover'),
		className
	);

const iconClassName = (iconRotateRTL?: boolean) => clsx(iconRotateRTL && 'rotate-180');

export default {
	linkStyle,
	iconClassName,
};
