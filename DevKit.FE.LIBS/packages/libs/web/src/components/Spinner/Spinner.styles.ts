import clsx from 'clsx';

const spinnerStyle = (variant: 'primary' | 'secondary', state: 'danger' | 'success' | undefined) =>
	clsx(
		'animate-spin rounded-full',
		variant === 'primary' && !state && 'border-brand-100 nj-border-t-brand',
		variant === 'primary' && state === 'danger' && 'border-red-500 border-t-red-100',
		variant === 'primary' && state === 'success' && 'border-green-500 border-t-green-100',
		variant === 'secondary' && !state && 'border-white nj-border-t-brand',
		variant === 'secondary' && state === 'danger' && 'border-white border-t-red-500',
		variant === 'secondary' && state === 'success' && 'border-white border-t-green-500'
	);

export default {
	spinnerStyle,
};
