import clsx from 'clsx';

const contentWrapper = (isFullScreen: boolean, hasTitle: boolean) =>
	clsx(
		'justify-between items-center',
		'flex flex-col',
		isFullScreen ? 'h-screen  p-8' : '',
		hasTitle && isFullScreen ? 'pt-3' : ''
	);

const imageSliderContainer = 'flex items-center justify-between flex-1 w-full gap-4';
const imageSliderArrow = (isActive: boolean) => clsx('flex self-center', 'w-8 h-8', isActive ? 'text-gray-200' : '');

const thumbnailsContentWrapper = 'items-center mt-6 mb-1 justify-evenly';
const thumbnailsContainer = 'flex items-center justify-center gap-4';
const thumbnailPdf = (isActive: boolean) =>
	clsx(
		'w-16 h-16',
		'border-2 border-solid rounded-sm',
		'overflow-hidden',
		'flex justify-center items-center',
		isActive ? 'nj-border-brand' : 'border-gray-100'
	);

const thumbnailImage = (isActive: boolean) =>
	clsx(
		'w-16 h-16',
		'border-2 border-solid rounded-sm',
		'object-contain',
		isActive ? 'nj-border-brand' : 'border-gray-100'
	);

const customActionsContentWrapper = 'items-center pt-6';
const customActionsContainer = 'flex items-center justify-center gap-x-4';

export default {
	contentWrapper,
	imageSliderContainer,
	imageSliderArrow,
	thumbnailsContentWrapper,
	thumbnailsContainer,
	thumbnailPdf,
	thumbnailImage,
	customActionsContentWrapper,
	customActionsContainer,
};
