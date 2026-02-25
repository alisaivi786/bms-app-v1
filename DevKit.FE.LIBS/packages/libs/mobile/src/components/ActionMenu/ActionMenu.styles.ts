import clsx from 'clsx';

const itemContainer = (isLast: boolean) => clsx('pb-10 flex', !isLast && 'border-b border-gray-200');

const itemButton = (disabled?: boolean) =>
	clsx('w-full group px-5 first:rounded-t-md last:rounded-b-md', disabled && 'opacity-30');

const renderItemContainer = 'flex flex-row items-center justify-start gap-3 py-3 pe-4';

export default {
	itemContainer,
	itemButton,
	renderItemContainer,
};
