import clsx from 'clsx';

const itemContainer = 'flex flex-row items-center justify-start gap-3 py-3 pe-4';

const icon = (checked: boolean) =>
	clsx('h-3 w-3', 'nj-text-brand md:group-hover:text-white', checked ? 'visible' : 'invisible');

export default {
	itemContainer,
	icon,
};
