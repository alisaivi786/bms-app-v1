import clsx from 'clsx';

const contentWrapper = clsx('relative flex flex-col items-center justify-center w-full max-w-full max-h-full');
const controlsIcons = clsx('flex items-center justify-center w-10 h-10 border-b-2 cursor-pointer border-b-gray-600');
const controlsResetIcons = clsx('flex items-center justify-center w-10 h-10 cursor-pointer');
const panViewerContentWrapper = clsx('w-full h-full overflow-hidden');
const panViewer = clsx('w-full h-full flex [&>div]:flex [&>div]:flex-1');
const panViewerImageContainer = clsx('flex justify-center flex-1 overflow-hidden !h-auto items-center');
const panViewerPdf = clsx('overflow-hidden !h-fit');

export default {
	contentWrapper,
	controlsIcons,
	controlsResetIcons,
	panViewerContentWrapper,
	panViewer,
	panViewerImageContainer,
	panViewerPdf,
};
