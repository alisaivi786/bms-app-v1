import clsx from 'clsx';

const container = (mobileDirection: string) =>
	clsx(
		'flex overflow-auto scrollbar-hide shrink-0',
		mobileDirection === 'horizontal'
			? 'flex-row w-full gap-2'
			: 'flex-col sm:flex-row h-full sm:h-auto gap-4 sm:gap-2 w-auto sm:w-full'
	);
const button = (
	isSelected: boolean,
	GroupButtonSize: string,
	variant: string,
	mobileDirection: string,
	selectedVariant: string
) =>
	clsx(
		`flex justify-center cursor-pointer rounded-md nj-groupBtn-font-weight whitespace-nowrap leading-none items-center ${
			mobileDirection === 'horizontal' ? 'flex-row w-full' : 'flex-col sm:flex-row h-full sm:h-auto w-auto sm:w-full'
		}`,
		isSelected
			? selectedVariant === 'brand'
				? 'ng-groupBtn-selected-brand'
				: 'ng-groupBtn-selected'
			: `ng-groupBtn-${variant}`,
		GroupButtonSize === 'xSmall' && 'px-2 py-1.5 h-6 text-caption1',
		GroupButtonSize === 'small' && 'px-3 py-1.5 h-8 text-paragraph',
		GroupButtonSize === 'medium' && 'px-4 py-2.5 h-10 text-body',
		GroupButtonSize === 'large' && 'px-4 py-3 h-12 text-body'
	);

export default {
	container,
	button,
};
