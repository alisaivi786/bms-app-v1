import clsx from 'clsx';

const container = 'flex flex-grow flex-col box-border overflow-auto py-6';
const eventContainer = 'flex relative min-h-70';
const opposite = (sm: boolean) => (sm ? 'px-2' : 'text-end px-6 leading-1 flex-1');
const separator = 'flex flex-0 items-center flex-col relative';
const marker =
	'border-4 border-solid nj-border-brand rounded-full w-4 h-4 bg-white flex self-start absolute -start-2 top-4';
const connector = 'w-0.5 bg-gray-200 flex-grow';

const contentContainer = (position: 'start' | 'end') =>
	clsx('text-start px-6 leading-1 flex-1', position === 'start' ? 'flex justify-end' : 'flex justify-start');
const contentInnerContainer = (position: 'start' | 'end') =>
	clsx(
		'bg-white shadow-elevation1 text-start p-2 mb-4 self-end relative w-full max-w-[375px]',
		position === 'start' ? 'border-e-4 nj-border-brand rounded-s-lg' : 'border-s-4 nj-border-brand rounded-e-lg'
	);

const arrowContainer = (position: 'start' | 'end') =>
	clsx(position === 'start' ? '-end-4' : '-start-4', 'absolute top-3.5');
const arrow = 'w-5 h-5 nj-text-brand rtl:rotate-180';
const skeletonContainer = 'relative table w-[50%] mx-auto';
const skeletonRow = 'table-cell px-3 py-2';
const skeleton = 'h-4';

export default {
	container,
	eventContainer,
	opposite,
	separator,
	marker,
	connector,
	contentContainer,
	contentInnerContainer,
	arrowContainer,
	arrow,
	skeletonContainer,
	skeletonRow,
	skeleton,
};
