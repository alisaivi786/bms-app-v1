import clsx from 'clsx';

const infoIconStyle = () => clsx('text-gray-600');

const contentWrapper = (className?: string, popoverVariant?: 'light' | 'dark') =>
	clsx(
		'z-floating self-start rounded-lg shadow-card break-words p-4 gap-2',
		popoverVariant === 'light' ? ' bg-white text-black' : 'bg-black text-white',
		className
	);

const popoverContentWrapper = 'self-start gap-2 p-4';
const popoverHeaderStyle = (popoverVariant?: 'light' | 'dark', reverseLayout?: boolean) =>
	clsx(
		`text-paragraph ${reverseLayout ? '' : 'text-left'} font-main-bold`,
		popoverVariant === 'light' ? 'text-black' : 'text-white'
	);
const popoverDescriptionStyle = (popoverVariant?: 'light' | 'dark', reverseLayout?: boolean) =>
	clsx(
		`text-caption1 ${reverseLayout ? '' : 'text-left'} font-main-regular`,
		popoverVariant === 'light' ? 'text-black' : 'text-white'
	);

export default {
	infoIconStyle,
	contentWrapper,
	popoverContentWrapper,
	popoverHeaderStyle,
	popoverDescriptionStyle,
};
