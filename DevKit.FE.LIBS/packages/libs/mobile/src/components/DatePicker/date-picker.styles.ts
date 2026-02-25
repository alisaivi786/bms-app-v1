import clsx from 'clsx';
import { CalendarViewMode } from './components/CalendarView';

const mainViewContainer = (isIntervalPicker?: boolean) =>
	`text-caption1 w-full ${isIntervalPicker ? 'md:w-[512px]' : 'md:w-64'}`;
const viewContainer = (pickerViewMode: CalendarViewMode) =>
	clsx(pickerViewMode !== 'time' && 'border-t border-t-gray-100', 'w-full items-start justify-center');
const viewTimeFooter = 'border-t border-t-gray-100 pt-2 flex-row w-full items-center justify-center gap-2 pb-4';
const viewIntervalTimeFooter = 'flex-col md:flex-row w-full justify-center items-center border-t border-t-gray-100';
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
	container: 'flex gap-2.5 items-center nj-text-brand',
	icon: 'flex',
};

const navigationIconContainer = (disabled: boolean) => clsx(disabled && 'text-gray-500', 'py-2 px-4 md:p-2');

const navigationIcon = (disabled: boolean) => clsx(disabled ? 'text-gray-500' : 'nj-text-brand', 'h-4 w-4');

const dayViewContainer = 'flex flex-col gap-2 w-full pt-3 px-4';

const dayViewDaysNamesContainer = 'w-full my-6';

const daysViewGrid = 'w-full ';

const dayViewDayNameItem = ' items-center justify-center ';

const intervalDayBackground = (isStartDay?: boolean, isEndDay?: boolean, isVisibility?: boolean) => {
	return clsx(
		'w-full h-8 items-center justify-center absolute',
		isVisibility && 'bg-brand-100',
		isStartDay && 'w-[50%] self-end',
		isEndDay && 'w-[50%] self-start'
	);
};

const dayItem = (
	selected: boolean,
	disabled: boolean,
	currentMonth: boolean,
	selectionMode: 'primary' | 'secondary' | 'ternary' = 'primary',
	isIntervalPicker: boolean,
	isToday: boolean
) => {
	const selectionModeColor = {
		primary: 'nj-calendar-start-day',
		secondary: 'nj-calendar-end-day',
		ternary: 'rounded-none',
	};

	return clsx(
		'items-center justify-center h-8 w-full overflow-hidden',
		!disabled && [
			!selected && isToday && 'nj-calendar-today-bg',
			(selected || currentMonth || isToday) && 'rounded-full w-8 h-8',
			selected && selectionModeColor[selectionMode],
			!currentMonth && isIntervalPicker && 'opacity-0',
		]
	);
};

const dayItemText = (
	selected: boolean,
	disabled: boolean,
	currentMonth: boolean,
	selectionMode: 'primary' | 'secondary' | 'ternary' = 'primary',
	isToday: boolean
) => {
	const selectionModeColor = {
		primary: 'text-white',
		secondary: 'nj-calendar-end-day-text',
		ternary: 'text-gray-900',
	};

	return clsx(
		'font-main-medium nj-calendar-day-text',
		!selected && isToday && 'nj-calendar-today-text',
		!currentMonth && 'text-gray-500',
		selected && selectionModeColor[selectionMode],
		disabled && 'text-gray-300'
	);
};

const monthItemText = (disabled: boolean) => {
	return clsx('nj-calendar-month-text', disabled && 'text-gray-300');
};

const monthAndYearGrid = 'w-full';

const monthAndYearItem = (disabled: boolean) => {
	return clsx('flex justify-center items-center h-9 rounded-md ', disabled && ' text-gray-300');
};

const monthsAndYearsHeaderContainer = 'flex-row items-center justify-between w-full';

const daysHeaderContainer = (reverseLayout: boolean) =>
	clsx('flex-row items-center justify-center flex-1 gap-8', reverseLayout && 'flex-row-reverse');

const monthItemsContainer = 'items-center flex-1 my-6';

const timeContainer = 'flex pb-4 justify-center py-1 rounded-md w-full';
const intervalTimeFooterContainer = 'flex justify-center py-1 rounded-md w-full';
const intervalTimePickerContainer = 'flex justify-center py-1 rounded-md w-48 shadow-datePicker text-paragraph';

const timeViewHeaderContainer = 'flex-row items-center justify-center w-full gap-2';

const ageLabel = (hasErrors: boolean) => clsx('absolute top-0 h-full flex items-center', hasErrors && 'text-red-500');

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
	intervalDayBackground,
	dayItem,
	dayItemText,
	monthItemText,
	dayViewDaysNamesContainer,
	dayViewDayNameItem,
	daysViewGrid,
	monthAndYearItem,
	monthItemsContainer,
	monthsAndYearsHeaderContainer,
	daysHeaderContainer,
	monthAndYearGrid,
	timeContainer,
	ageLabel,
	timeButtons,
	viewButtonsFooter,
	intervalTimeFooterContainer,
	intervalTimePickerContainer,
	timeViewHeaderContainer,
};
