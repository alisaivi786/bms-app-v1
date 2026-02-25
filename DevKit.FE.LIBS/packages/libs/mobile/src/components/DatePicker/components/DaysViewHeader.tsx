import { I18nManager, Pressable, Text, View } from 'react-native';
import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/native';
import {
	addDays,
	addMonths,
	formatDate,
	getDuration,
	getTzIsSameMonth,
	getTzIsSameYear,
	getTzStartOfMonth,
	setTimeToDay,
} from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { checkIsValidRangeForDaysHeader } from '../utils/picker-navigation';
import { useCalendarViewContext } from './CalendarView';

export const DaysViewHeader = () => {
	const {
		updateViewState,
		viewState: { tzDate, currentCalendar, intervalStartDate, intervalEndDate },
		fromDate,
		toDate,
		enableTimeSelection,
		isIntervalPicker,
		maxSelectionRangeDays,
	} = useCalendarViewContext();

	const { tw, reverseLayout, locale } = useMobileUIConfigOptions();

	const sameYear = !!fromDate && !!toDate && getTzIsSameYear(fromDate, toDate, currentCalendar);
	const sameMonth = !!fromDate && !!toDate && getTzIsSameMonth(fromDate, toDate, currentCalendar);

	let { allowNextMonth, allowPreviousMonth } = checkIsValidRangeForDaysHeader({
		isIntervalPicker,
		maxSelectionRangeDays,
		intervalStartDate,
		intervalEndDate,
		refDate: tzDate,
	});

	if (toDate) {
		const toDuration = getDuration(getTzStartOfMonth(toDate), getTzStartOfMonth(tzDate));

		allowNextMonth = allowNextMonth && (toDuration.months > 0 || toDuration.years > 0);
	}

	if (fromDate) {
		const fromDuration = getDuration(getTzStartOfMonth(tzDate), getTzStartOfMonth(fromDate));

		allowPreviousMonth = allowPreviousMonth && (fromDuration.months > 0 || fromDuration.years > 0);
	}

	return (
		<View style={tw`flex-row items-center`}>
			<Pressable
				onPress={() => {
					if (allowPreviousMonth) {
						const newTzDate = addMonths(addDays(getTzStartOfMonth(tzDate, currentCalendar), 2), -1);

						updateViewState({
							tzDate: enableTimeSelection ? setTimeToDay(tzDate, newTzDate) : newTzDate,
						});
					}
				}}
				style={[
					tw`${styles.navigationIconContainer(!allowPreviousMonth)}`,
					I18nManager.isRTL && {
						transform: [
							{
								rotate: '180deg',
							},
						],
					},
				]}
			>
				<ArrowLeftIcon style={tw`${allowPreviousMonth ? 'text-brand-600' : 'text-gray-500'}`} width={18} height={18} />
			</Pressable>
			<View style={tw`${styles.daysHeaderContainer(reverseLayout)}`}>
				<Pressable
					onPress={() => {
						if (!sameMonth) updateViewState({ viewMode: 'months' });
					}}
					hitSlop={16}
				>
					<Text style={tw`nj-calendar-header-text`}>
						{formatDate(tzDate, {
							dateFormat: 'MMMM',
							calendar: currentCalendar,
							locale,
						})}
					</Text>
				</Pressable>

				<Pressable
					onPress={() => {
						if (!sameYear) updateViewState({ viewMode: 'years' });
					}}
					hitSlop={16}
				>
					<Text style={tw`nj-calendar-header-text`}>
						{formatDate(tzDate, {
							dateFormat: 'yyyy',
							calendar: currentCalendar,
							locale,
						})}
					</Text>
				</Pressable>
			</View>
			<Pressable
				onPress={() => {
					if (allowNextMonth) {
						const newTzDate = addMonths(addDays(getTzStartOfMonth(tzDate, currentCalendar), 2), 1);

						updateViewState({
							tzDate: enableTimeSelection ? setTimeToDay(tzDate, newTzDate) : newTzDate,
						});
					}
				}}
				style={[
					tw`${styles.navigationIconContainer(!allowNextMonth)}`,
					I18nManager.isRTL && {
						transform: [
							{
								rotate: '180deg',
							},
						],
					},
				]}
			>
				<ArrowRightIcon style={tw`${allowNextMonth ? 'text-brand-600' : 'text-gray-500'}`} width={18} height={18} />
			</Pressable>
		</View>
	);
};
