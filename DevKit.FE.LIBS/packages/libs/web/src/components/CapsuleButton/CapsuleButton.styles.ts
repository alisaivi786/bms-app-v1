import clsx from 'clsx';
import { ComponentSize } from '@devkit/utilities';

const container = 'flex w-full gap-2 flex-wrap';

const button = (size: ComponentSize, toggled: boolean) =>
	clsx(
		'text-caption1 font-normal justify-center items-center basis-16 w-full whitespace-nowrap border px-3 flex cursor-pointer transition-colors duration-200 ease-in-out',
		toggled ? 'text-white bg-gray-600 text-black border-gray-600' : 'bg-white  border-gray-200 border-gray-200',
		size === 'small' && ['rounded-3xl leading-6'],
		size === 'medium' && ['rounded-4xl leading-8'],
		size === 'large' && ['rounded-5xl leading-10']
	);
const label = 'truncate flex justify-center items-center';

export default {
	button,
	container,
	label,
};
