import clsx from 'clsx';

const itemContainer = (isLast: boolean) =>
	clsx('flex flex-col', 'w-full md:w-max md:min-w-full', !isLast && 'border-b border-gray-200');

const itemButton = (disabled?: boolean) =>
	clsx(
		'w-full hover:nj-bg-brand hover:text-white group px-5 first:rounded-t-md last:rounded-b-md',
		disabled && 'opacity-30'
	);

export default {
	itemContainer,
	itemButton,
};
