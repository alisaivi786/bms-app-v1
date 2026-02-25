import { FlatList, Pressable, Text, View } from 'react-native';
import { formatDate, getTzEachMonthOfInterval, getTzEndOfYear, getTzStartOfYear, setTimeToDay } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { checkIsValidRangeForMonthView } from '../utils/picker-navigation';
import { useCalendarViewContext } from './CalendarView';

export const MonthsView = ({ onClick }: { onClick: (selectedDate: Date) => void }) => {
	const {
		fromDate,
		toDate,
		enableTimeSelection,
		viewState: { tzDate, currentCalendar, intervalStartDate, intervalEndDate },
		isIntervalPicker,
		maxSelectionRangeDays,
	} = useCalendarViewContext();

	const { tw, isRtlLocale, locale } = useMobileUIConfigOptions();
	const startOfYear = getTzStartOfYear(tzDate, currentCalendar);
	const endOfYear = getTzEndOfYear(tzDate, currentCalendar);

	const months = getTzEachMonthOfInterval({
		tzDateStart: startOfYear,
		tzDateEnd: endOfYear,
		calendar: currentCalendar,
	});

	const monthItem = ({ item: currentMonthDate }: { item: Date }) => {
		const disabled = !checkIsValidRangeForMonthView({
			isIntervalPicker,
			maxSelectionRangeDays,
			intervalStartDate,
			intervalEndDate,
			currentMonthDate,
			toDate,
			fromDate,
			currentCalendar,
		});

		return (
			<View style={tw`${styles.monthItemsContainer}`}>
				<Pressable
					disabled={disabled}
					hitSlop={16}
					onPress={() => {
						if (!disabled) {
							const selectedDate = enableTimeSelection ? setTimeToDay(tzDate, currentMonthDate) : currentMonthDate;

							onClick(selectedDate);
						}
					}}
				>
					<Text style={tw`${styles.monthItemText(disabled)}`}>
						{formatDate(currentMonthDate, {
							dateFormat: isRtlLocale ? 'MMMM' : 'MMM',
							calendar: currentCalendar,
							locale,
						})}
					</Text>
				</Pressable>
			</View>
		);
	};

	return (
		<View style={tw`${styles.monthAndYearGrid}`}>
			<FlatList data={months} renderItem={monthItem} keyExtractor={(item) => item.toString()} numColumns={4} />
		</View>
	);
};
