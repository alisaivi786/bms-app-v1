import clsx from 'clsx';

const container = clsx('gap-2');

const title = clsx('text-xs font-main-bold text-black-600 pt-2 text-left');

const card = (hasMultipleItems: boolean) =>
	clsx(
		'bg-white overflow-hidden border border-gray-200',
		hasMultipleItems ? 'rounded-xl' : 'rounded-xl shadow-[0_6px_18px_0_rgba(190,190,190,0.2)]'
	);

const itemContainer = clsx('flex-row justify-between items-center w-full min-h-14 px-4 bg-white');

const leftSection = clsx('flex-row items-center gap-[14px] flex-1');

const titleText = clsx('text-sm font-main-regular leading-5 text-black');

const divider = clsx('h-[1px] bg-gray-200 mx-4');

const row = clsx('flex-row items-center');

const contentRow = clsx('flex-row items-center justify-between flex-1');

export default {
	container,
	title,
	card,
	itemContainer,
	leftSection,
	titleText,
	divider,
	row,
	contentRow,
};
