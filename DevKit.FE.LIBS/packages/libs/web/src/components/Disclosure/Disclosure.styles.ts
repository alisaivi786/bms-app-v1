import clsx from 'clsx';
import { IDisclosureProps } from './types';

const container = (className?: string) => clsx('flex flex-col', className);

const arrow = clsx('text-caption1', 'rounded-full nj-disclosure-arrow');
const separator = clsx('border-b border-gray-200 border-solid');
const variants: {
	[key in Exclude<IDisclosureProps['variant'], undefined>]: {
		arrow: string;
		body: string;
		button: string;
		buttonContainer?: string;
		container: (className?: string) => string;
		separator: string;
	};
} = {
	primary: {
		arrow,
		body: clsx('pt-2 font-normal text-gray-700 text-paragraph nj-disclosure-body'),
		button: clsx('flex w-full items-center justify-between', 'text-left text-body font-bold', 'duration-500', 'nj-disclosure-header'),
		container: (className?: string) => clsx(container(className), 'gap-2'),
		separator: clsx(separator, 'nj-disclosure-separator'),
	},
	secondary: {
		arrow,
		body: 'pt-6',
		button: clsx(
			'flex w-full items-center justify-between',
			'text-left text-h3 font-bold',
			'transition-colors duration-500',
			'ms-1'
		),
		buttonContainer: 'mt-6 mb-8',
		container,
		separator,
	},
};

export default variants;
