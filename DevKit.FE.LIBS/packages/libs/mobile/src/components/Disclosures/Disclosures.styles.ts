import clsx from 'clsx';

const collapsiblePressable = (reverseLayout: boolean) =>
	clsx(
		reverseLayout ? 'flex-row-reverse' : 'flex-row',
		'bg-white w-full justify-between items-center p-0',
		'nj-disclosure-collapsible-item-padding'
	);

const itemsContainer = clsx(
	'm-0 bg-white',
	'nj-disclosure-items-container-horizontal-padding',
	'nj-disclosure-items-container-vertical-padding'
);

const childrenAnimatedContainer = clsx('overflow-hidden');

const childrenWrapper = clsx('absolute left-0 right-0', 'opacity-100');

const collapsibleTitle = (isTileVersion?: boolean) =>
	clsx(
		'font-main-bold',
		'nj-disclosure-collapsible-title-font',
		'nj-disclosure-collapsible-title-font-size',
		'nj-disclosure-collapsible-title-line-height',
		'nj-disclosure-collapsible-title-color',
		isTileVersion && 'text-paragraph w-9/10'
	);

const contentContainer = clsx('nj-disclosure-content-container-padding');

const expandIcon = clsx('nj-disclosure-expand-icon-color');

const separator = clsx(
	'border-b border-gray-200 h-0 my-2',
	'nj-disclosure-separator-width',
	'nj-disclosure-separator-vertical-margin'
);

const container = clsx(
	'nj-disclosure-container-border-width',
	'nj-disclosure-container-border-color',
	'nj-disclosure-container-border-radius',
	'nj-disclosure-container-padding'
);

const tile = clsx(
	'nj-disclosure-container-border-width',
	'nj-disclosure-container-border-color',
	'nj-disclosure-container-border-radius',
	'nj-disclosure-container-padding',
	'nj-disclosure-container-bg-color',
	'mb-3'
);

export default {
	collapsiblePressable,
	itemsContainer,
	collapsibleTitle,
	expandIcon,
	contentContainer,
	childrenWrapper,
	childrenAnimatedContainer,
	separator,
	container,
	tile,
};
