import clsx from 'clsx';

const buttonStyle = (className?: string, disabled?: boolean, variant?: 'primary' | 'inverse') =>
	clsx(
		'flex items-center justify-between gap-1 text-paragraph  font-main-medium',
		disabled && 'text-gray-500',
		!disabled &&
			(variant === 'inverse' ? 'text-white hover:text-gray-300' : 'nj-text-brand hover:nj-text-brand-hover '),
		className
	);
const iconClassName = (iconRotateRTL?: boolean) => clsx('text-caption1', iconRotateRTL && 'rotate-180');

export default {
	buttonStyle,
	iconClassName,
};
