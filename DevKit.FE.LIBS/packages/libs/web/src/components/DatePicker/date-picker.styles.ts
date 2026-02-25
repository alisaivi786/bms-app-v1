import clsx from 'clsx';
import { CalendarViewMode } from './components/CalendarView';

const mainViewContainer = (isIntervalPicker?: boolean) =>
	`text-caption1 w-full ${isIntervalPicker ? 'md:w-[32rem]' : 'md:w-64'} flex flex-col h-full`;
const viewContainer = (pickerViewMode: CalendarViewMode) =>
	clsx(pickerViewMode !== 'time' && 'border-t border-t-gray-100', 'flex-1 flex w-full items-start justify-center');
const viewTimeFooter = 'border-t border-t-gray-100 pt-2 flex w-full items-center justify-end gap-2';
const viewIntervalTimeFooter =
	'flex flex-col md:flex-row w-full justify-center items-center border-t border-t-gray-100';
const viewButtonsFooter = 'border-t border-t-gray-100 pt-2 flex w-full items-center justify-center';
const headerContainer = (isRtlLocale: boolean, viewMode: CalendarViewMode) =>
	clsx(
		'pb-3 flex items-center gap-5 w-full text-paragraph',
		viewMode === 'days' && isRtlLocale && 'justify-end',
		viewMode === 'days' && isRtlLocale && 'justify-start',
		viewMode !== 'days' && 'justify-between',
		isRtlLocale && 'flex-row-reverse'
	);

const dayViewLink = {
	container: 'flex gap-2.5 items-center cursor-pointer nj-text-brand',
	icon: 'flex',
};

const navigationIconContainer = (disabled: boolean) =>
	clsx(disabled ? 'cursor-default' : 'cursor-pointer', 'py-2 px-4 md:p-2');

const navigationIcon = (disabled: boolean) => clsx(disabled ? 'text-gray-500' : 'nj-text-brand', 'h-4 w-4');

const dayViewContainer = 'flex flex-col gap-2 w-full pt-3';

const dayViewDaysNamesContainer = 'grid grid-cols-7 text-gray-600';

const daysViewGrid = 'grid grid-cols-7 w-full font-medium text-gray-600';

const dayViewDayNameItem = 'flex items-center justify-center w-full h-6';

const dayItem = (
	selected: boolean,
	disabled: boolean,
	currentMonth: boolean,
	selectionMode: 'primary' | 'secondary' | 'ternary' = 'primary',
	isIntervalPicker: boolean,
	isFirstSelection?: boolean
) => {
	const active = 'z-10 before:rounded-full before:absolute before:w-8 before:h-8 before:-z-10';

	const selectionModeColor = {
		primary: [
			currentMonth && `${active} before:nj-bg-brand text-white ${!isFirstSelection && 'bg-half-left'}`,
			!currentMonth && isIntervalPicker
				? 'invisible'
				: `${active} before:nj-bg-brand text-white ${!isFirstSelection && 'bg-half-left'}`,
		],
		secondary: [
			currentMonth && `${active} before:nj-border-brand before:border bg-half-right before:bg-white nj-text-brand`,
			!currentMonth && isIntervalPicker
				? 'invisible'
				: `${active} before:nj-border-brand before:border bg-half-right before:bg-white nj-text-brand`,
		],
		ternary: [
			currentMonth && `${active} bg-brand-100 text-black rounded-none`,
			!currentMonth && isIntervalPicker ? 'invisible' : `${active} bg-brand-100 text-black rounded-none`,
		],
	};

	return clsx(
		'flex items-center justify-center font-medium mt-1 h-8 w-full relative',
		!disabled && [
			'cursor-pointer',
			!selected && [
				currentMonth && `${active} text-gray-900 before:hover:bg-gray-200 before:hover:rounded-full`,
				!currentMonth && isIntervalPicker ? 'invisible' : 'text-gray-500',
			],
			selected && selectionModeColor[selectionMode],
		],
		disabled && 'cursor-default text-gray-300'
	);
};

const monthAndYearGrid = 'self-center grid grid-cols-4 gap-y-5 w-full font-medium';

const monthAndYearItem = (disabled: boolean) => {
	return clsx(
		'flex justify-center items-center h-9 rounded-md ',
		!disabled && 'cursor-pointer hover:bg-gray-100',
		disabled && 'cursor-default text-gray-300'
	);
};

const timeContainer = 'cursor-pointer flex justify-center py-1 rounded-md hover:bg-gray-200 w-full';
const intervalTimeFooterContainer = 'flex justify-center py-1 rounded-md w-full';
const intervalTimePickerContainer = 'flex justify-center py-1 rounded-md w-48 shadow-datePicker text-paragraph';

const ageLabel = (hasErrors: boolean, disabled?: boolean) =>
	clsx('absolute top-0 h-full flex items-center', hasErrors && 'text-red-500', disabled && 'text-gray-400');

const timeButtons = (isRTL: boolean) =>
	clsx('flex justify-evenly sticky bottom-0 w-full gap-4 pt-4 mt-auto', isRTL && 'flex-row-reverse');

export default {
	mainViewContainer,
	headerContainer,
	viewContainer,
	viewTimeFooter,
	viewIntervalTimeFooter,
	dayViewLink,
	navigationIcon,
	navigationIconContainer,
	dayViewContainer,
	dayItem,
	dayViewDaysNamesContainer,
	dayViewDayNameItem,
	daysViewGrid,
	monthAndYearItem,
	monthAndYearGrid,
	timeContainer,
	ageLabel,
	timeButtons,
	viewButtonsFooter,
	intervalTimeFooterContainer,
	intervalTimePickerContainer,
};
