import clsx from 'clsx';

const alertContainer = (iconPosition?: 'center' | 'start', style?: string) =>
	clsx(
		'flex flex-row rounded-md leading-5',
		'nj-alert-container-border',
		'nj-alert-container-vertical-padding',
		'nj-alert-container-horizontal-padding',
		iconPosition === 'start' ? 'items-start' : 'items-center',
		style
	);

const alertChildrenContainer = (iconPosition?: 'center' | 'start') =>
	clsx('flex-none', iconPosition === 'start' && 'pt-1');

const warningIconStyle = 'text-yellow-500 nj-alert-severity-icon-width nj-alert-severity-icon-height';
const infoIconStyle = 'nj-Alert-info-icon nj-alert-severity-icon-width nj-alert-severity-icon-height';
const successIconStyle = 'text-green-500 nj-alert-severity-icon-width nj-alert-severity-icon-height';
const errorIconStyle = clsx(
	'nj-alert-severity-icon-color',
	'nj-alert-severity-icon-width',
	'nj-alert-severity-icon-height'
);

const warningStyle = 'border-yellow-500 bg-yellow-50';
const infoStyle = 'nj-border-brand nj-Alert-info-bg';
const successStyle = 'border-green-500 bg-green-50';
const errorStyle = 'border-red-500 nj-alert-bg';

const xContainer = clsx(
	'ml-auto justify-end flex items-center',
	'nj-alert-close-icon-height',
	'nj-alert-close-icon-width'
);

const closeIcon = 'text-paragraph text-gray-500 hover:text-gray-600';

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
