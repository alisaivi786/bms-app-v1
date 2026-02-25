import { ProgressBarSize } from './ProgressBar.types';

const SIZE_HEIGHT_MAP: Record<ProgressBarSize, string> = {
	small: 'h-1',
	medium: 'h-2',
	large: 'h-4',
};

const getContainerStyle = () => 'flex-row mt-[6px]';

export const getBarStyles = (size: ProgressBarSize) => {
	const sizeStyles = SIZE_HEIGHT_MAP[size];

	return `flex-1 bg-gray-200 overflow-hidden relative ${sizeStyles}`;
};

export const getFillBaseStyles = (size: ProgressBarSize) => {
	const sizeStyles = SIZE_HEIGHT_MAP[size];

	return `${sizeStyles} absolute top-0 left-0 bg-primary`;
};

const getLabelContainerStyles = () => 'absolute self-center border border-[#246DF9] bg-white rounded-[12px] p-[4px]';

const getLabelTextStyles = () => 'text-xs font-bold text-black';

export default {
	getContainerStyle,
	getBarStyles,
	getFillBaseStyles,
	getLabelContainerStyles,
	getLabelTextStyles,
};
