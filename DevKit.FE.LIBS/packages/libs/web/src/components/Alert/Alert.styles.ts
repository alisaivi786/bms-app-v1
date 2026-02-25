import clsx from 'clsx';

const alertContainer = (iconPosition?: 'center' | 'start', style?: string) =>
	clsx('flex gap-2 rounded-md border p-2 leading-5', iconPosition === 'start' ? 'items-start' : 'items-start', style);

const alertChildrenContainer = (iconPosition?: 'center' | 'start') =>
	clsx('flex-none', iconPosition === 'start' && 'pt-1');
const warningIconStyle = 'text-yellow-500 w-5 h-5';
const infoIconStyle = 'nj-Alert-info-icon w-5 h-5';
const successIconStyle = 'text-green-500  w-5 h-5';
const errorIconStyle = 'text-red-500  w-5 h-5';
const warningStyle = 'border-yellow-500 bg-yellow-50';
const infoStyle = 'nj-alert-info-border nj-Alert-info-bg';
const successStyle = 'border-green-500 bg-green-50';
const errorStyle = 'border-red-500 bg-red-50';
const xContainer = 'ml-auto h-5 w-5 justify-end flex items-center';
const closeIcon = 'cursor-pointer text-paragraph text-gray-500 hover:text-gray-600 w-3.5 h-3.5  shrink-0';

export default {
	alertContainer,
	alertChildrenContainer,
	warningIconStyle,
	infoIconStyle,
	successIconStyle,
	errorIconStyle,
	warningStyle,
	infoStyle,
	successStyle,
	errorStyle,
	closeIcon,
	xContainer,
};
