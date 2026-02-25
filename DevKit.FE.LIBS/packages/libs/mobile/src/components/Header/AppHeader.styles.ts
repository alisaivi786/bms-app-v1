import clsx from 'clsx';

const container = clsx('flex-row items-center justify-between w-full px-[16px] pt-2 pb-3 bg-white');

const leftSection = clsx('flex-row items-center gap-2');

const centerSection = (hasDisplayName?: boolean) =>
	clsx(
		'flex-1',
		hasDisplayName ? 'flex-1 items-start justify-center' : 'absolute inset-x-0 items-center justify-center'
	);

const rightSection = clsx('flex-row items-center gap-3');

const welcomeText = clsx('text-sm text-black-400');

const nameText = clsx('text-[16px] font-main-bold text-black');

const titleText = clsx('font-main-bold text-black ');

const iconWrapper = clsx('p-1');

export default {
	container,
	leftSection,
	centerSection,
	rightSection,
	welcomeText,
	nameText,
	titleText,
	iconWrapper,
};
