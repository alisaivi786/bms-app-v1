import clsx from 'clsx';

const modal = (titlePosition: 'start' | 'end' | 'center' = 'start') => ({
	contentContainer: clsx('w-full justify-start items-stretch bg-white rounded-lg shadow-lg border border-gray-200'),
	content: clsx('px-6 gap-6'),
	headerContent: clsx('flex-row items-center justify-between'),
	titleContainer: clsx('flex-1', `items-${titlePosition}`),
	title: clsx('font-main-bold text-title'),
	subTitle: clsx('text-gray-500 text-center'),
	closeIcon: clsx(''),
	description: clsx('text-center text-gray-600'),
	body: clsx('overflow-scroll'),
	listContent: clsx('px-6'),
});

export default {
	modal,
};
