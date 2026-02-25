import clsx from 'clsx';

const button = clsx(
	'box-border',
	'flex',
	'flex-row',
	'items-center',
	'justify-center',
	'w-[85px]',
	'min-w-[80px]',
	'h-11',
	'border',
	'rounded-full',
	'flex-none',
	'cursor-pointer',
	'disabled:opacity-50',
	'disabled:cursor-not-allowed',
	'p-3',
	'nj-partner-language-switch'
);

const contentContainer = clsx(
	'flex',
	'flex-row',
	'justify-center',
	'items-center',
	'gap-2',
	'p-0',
	'w-auto',
	'h-5',
	'flex-none'
);

const icon = clsx('w-4', 'h-4', 'flex-none', 'nj-partner-language-switch-icon');

const label = clsx(
	'w-auto',
	'h-5',
	'text-paragraph',
	'font-medium',
	'leading-5',
	'flex-none',
	'nj-partner-language-switch-label'
);

export default {
	button,
	contentContainer,
	icon,
	label,
};
