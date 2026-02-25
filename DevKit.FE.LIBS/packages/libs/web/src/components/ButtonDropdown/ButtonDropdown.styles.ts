import clsx from 'clsx';


const multipleOptionStyle = (isChecked?: boolean, isDisabled?: boolean) =>
	clsx(
		'!outline-none cursor-pointer flex w-full gap-2 py-3 px-3 text-gray-700',
		isDisabled && '!bg-gray-50 !text-black',
		!isDisabled && 'hover:bg-brand-50',
		isChecked && 'bg-brand-50'
	);

const menuFooterStyle =
	'w-full flex flex-wrap sticky bottom-0 border-t w-full gap-4 px-3 py-4 bg-gray-50';

export default {
	menuFooterStyle,
	multipleOptionStyle,
};
