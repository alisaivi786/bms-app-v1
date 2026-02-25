import clsx from 'clsx';

const modal = (titlePosition: 'start' | 'end' | 'center' = 'start', bottom: number) => ({
	contentWrapper: clsx('flex-1'),
	contentContainer: clsx(
		'w-full justify-start items-stretch bg-white rounded-2xl shadow-lg p-2 border border-gray-200'
	),
	content: clsx('flex-1'),
	header: clsx('border-b border-gray-200 pb-2', `justify-${titlePosition}`),
	title: clsx('font-main-bold text-title text-center'),
	subTitle: clsx('text-gray-500 text-center'),
	description: clsx('pb-4 text-center text-gray-600'),
	body: clsx('flex-4'),
	footer: clsx(`flex-1 border-t border-gray-200 pt-4 flex justify-center items-center pb-${bottom / 4} bg-white`),
	footerButton: clsx('bg-blue-500 text-white px-4 py-2 rounded-full shadow-md'),
});

export default {
	modal,
};
