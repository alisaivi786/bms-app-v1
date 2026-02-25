import clsx from 'clsx';

const popoverElementStyle = 'inline-block overflow-hidden shrink-0';

const infoIconStyle = (internalIsOpen?: boolean) =>
	clsx('text-body text-gray-600 hover:text-black', internalIsOpen && '!text-black');

const contentWrapper = (className?: string, popoverVariant?: 'light' | 'dark', hidden?: boolean) =>
	clsx(
		'z-floating max-w-full sm:max-w-sm flex rounded-lg !shadow-card break-words',
		hidden && 'hidden',
		popoverVariant === 'light' ? ' bg-white text-black' : 'bg-black text-white',
		className
	);

const popoverContentWrapper = 'flex flex-col gap-2 p-4 w-full';
const popoverHeaderStyle = (popoverVariant?: 'light' | 'dark') =>
	clsx('text-paragraph font-bold', popoverVariant === 'light' ? 'text-black' : 'text-white');
const popoverDescriptionStyle = (popoverVariant?: 'light' | 'dark') =>
	clsx('text-caption1 font-normal', popoverVariant === 'light' ? 'text-black' : 'text-white');

export default {
	popoverElementStyle,
	infoIconStyle,
	contentWrapper,
	popoverContentWrapper,
	popoverHeaderStyle,
	popoverDescriptionStyle,
};
