import clsx from 'clsx';

const bottomSheet = () => ({
	backdrop: clsx('bg-transparent'),
	container: clsx('flex flex-1 h-full w-full justify-center'),
	contentContainer: clsx(
		'flex flex-1 w-full justify-start items-stretch bg-white rounded-2xl shadow-lg border border-gray-200',
		'nj-dropdown-bottom-sheet-modal-container-padding'
	),
	itemContainer: (isDisabled?: boolean) =>
		clsx('flex bg-white py-3 px-6 border-b border-gray-200').concat(isDisabled ? ' bg-gray-100 opacity-30' : ' '),
	searchableTextField: clsx('px-4 py-2'),
	flatListContainer: (isSearchable: boolean | undefined, bottomSafeArea: number, additionalPadding: number) =>
		clsx(`pb-[${16 + bottomSafeArea + (isSearchable ? additionalPadding : 0)}px]`, isSearchable ? 'min-h-36' : ''),
	titleContainer: clsx(
		'flex-row justify-between items-center',
		'nj-dropdown-bottom-sheet-header-horizontal-padding',
		'nj-dropdown-bottom-sheet-header-bottom-padding'
	),
	titleComponent: clsx(
		'nj-dropdown-bottom-sheet-title-font nj-dropdown-bottom-sheet-title-font-size nj-dropdown-bottom-sheet-title-font-color'
	),
	emptyResultContainer: 'px-4 py-2',
	emptyResultText: 'font-main-regular text-body text-gray-500',
});

const menu = () => ({
	container: (isRtlLocale: boolean) =>
		clsx(
			isRtlLocale ? 'flex-row-reverse' : 'flex-row',
			'items-center',
			'justify-between',
			'nj-dropdown-menu-container-gap'
		),
	label: clsx(
		'leading-normal',
		'nj-dropdown-menu-label-height',
		'nj-dropdown-menu-label-text-font',
		'nj-dropdown-menu-label-text-color',
		'nj-dropdown-menu-label-text-size'
	),
	icon: clsx('nj-dropdown-menu-icon-color'),
});

const inputArea = (hasErrors: boolean, isOpen: boolean) =>
	clsx(
		'flex-1 flex-row w-full nj-dropdown-container-bg px-3 h-10 justify-between items-center rounded-md',
		isOpen && !hasErrors
			? 'border-2 nj-border-brand'
			: hasErrors
			? 'border-2 nj-text-input-container-error-border-color nj-text-input-container-error-bg'
			: 'border border-gray-600'
	);

const text = (disabled: boolean, hasErrors: boolean, hasValue: boolean) =>
	clsx(
		'nj-text-input-font nj-text-input-font-size flex-1 text-left',
		hasValue && !disabled ? 'text-black' : 'text-gray-500',
		disabled && 'text-gray-600',
		!disabled && hasErrors && 'text-red-500'
	);

const iconColor = (disabled: boolean, hasErrors: boolean) => {
	if (disabled) {
		return 'gray-600';
	} else {
		if (hasErrors) return 'red-500';

		return 'black';
	}
};

const footerContainer = 'flex-row w-full min-h-5';

export default {
	bottomSheet,
	menu,
	text,
	inputArea,
	iconColor,
	footerContainer,
};
