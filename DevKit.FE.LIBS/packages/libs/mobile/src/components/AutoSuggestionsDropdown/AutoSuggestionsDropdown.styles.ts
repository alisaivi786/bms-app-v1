import clsx from 'clsx';
import { ComponentSize } from '@devkit/utilities/src/types/Forms/Common';

const menuContainerStyle = (size: ComponentSize) =>
	clsx(
		'absolute flex flex-col w-full bg-white border border-gray-500 rounded-md shadow-card max-h-80',
		size !== 'large' && 'top-12',
		size === 'large' && 'top-16'
	);

export default {
	menuContainerStyle,
};
