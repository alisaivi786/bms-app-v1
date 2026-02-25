const menu = () => ({
	container: (isRtlLocale: boolean) =>
		`flex-row items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white ${
			isRtlLocale ? 'flex-row-reverse' : ''
		}`,
	label: 'font-main-regular text-body text-gray-900',
	icon: 'ml-2',
});

const bottomSheet = () => ({
	pressableContainer: 'min-h-full w-full',
	contentContainer: 'bg-white rounded-t-2xl shadow-lg',
	searchableTextField: 'px-4 pb-4',
	flatListContainer: 'pb-4',
	dropdownItemContainer: (isLastItem: boolean) => `py-3 ${isLastItem ? '' : 'border-b border-gray-200'}`,
});

export default { menu, bottomSheet };
