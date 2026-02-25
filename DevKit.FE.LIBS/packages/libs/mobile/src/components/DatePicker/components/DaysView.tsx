import { FlatList, Pressable, Text, View } from 'react-native';
import {
	addDays,
	formatDate,
	getTzDate,
	getTzEachDayOfInterval,
	getTzEndOfMonth,
	getTzEndOfWeek,
	getTzIsSameDay,
	getTzIsSameMonth,
	getTzStartOfMonth,
	getTzStartOfWeek,
	getTzTimeStates,
	getTzTodayDate,
} from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { checkIsValidRangeForDaysView } from '../utils/picker-navigation';
import { CalendarViewState, useCalendarViewContext } from './CalendarView';

const numColumns = 7; // Number of columns in grid

export const DaysView = ({
	onClick,
	value,
	secondaryValue,
	viewState,
	updateViewState,
}: {
	onClick: (selectedDate: Date) => void;
	value: Date | undefined;
	secondaryValue: Date | undefined;
	viewState: CalendarViewState;
	updateViewState?: (viewState: Partial<CalendarViewState>) => void;
}) => {
	const { fromDate, toDate, enableTimeSelection, isIntervalPicker, maxSelectionRangeDays } = useCalendarViewContext();
	const { tw, locale } = useMobileUIConfigOptions();
	const { tzDate, currentCalendar } = viewState;
	const firstDayOfMonth = getTzStartOfMonth(tzDate, currentCalendar);
	const { intervalStartDate, intervalEndDate, intervalEndDateHover } = viewState;

	if (!firstDayOfMonth) return <></>;

	const daysInMonthArray = getTzEachDayOfInterval({
		tzDateStart: firstDayOfMonth,
		tzDateEnd: getTzEndOfMonth(firstDayOfMonth, currentCalendar),
	}).map((date) => ({ date, currentMonth: true }));

	const startOfFirstWeek = getTzStartOfWeek(daysInMonthArray[0].date);
	const previousMonthDays = getTzIsSameMonth(startOfFirstWeek, daysInMonthArray[0].date, currentCalendar)
		? []
		: getTzEachDayOfInterval({
				tzDateStart: startOfFirstWeek,
				tzDateEnd: addDays(daysInMonthArray[0].date, -1),
		  }).map((date) => ({ date, currentMonth: false }));

	const endOfLastWeek = getTzEndOfWeek(daysInMonthArray[daysInMonthArray.length - 1].date);

	const nextMonthDays = getTzIsSameMonth(
		endOfLastWeek,
		daysInMonthArray[daysInMonthArray.length - 1].date,
		currentCalendar
	)
		? []
		: getTzEachDayOfInterval({
				tzDateStart: addDays(daysInMonthArray[daysInMonthArray.length - 1].date, 1),
				tzDateEnd: endOfLastWeek,
		  }).map((date) => ({ date, currentMonth: false }));

	const daysToShow = [...previousMonthDays, ...daysInMonthArray, ...nextMonthDays];

	const monthDaysItem = ({ item }: { item: { date: Date; currentMonth: boolean } }) => {
		const isValidHover =
			!!intervalEndDateHover &&
			!!intervalStartDate &&
			intervalEndDateHover > intervalStartDate &&
			item.date > intervalStartDate &&
			item.date <= intervalEndDateHover;

		const isSelected = !!value && getTzIsSameDay(value, item.date);
		const isSecondarySelected =
			(!!secondaryValue && getTzIsSameDay(secondaryValue, item.date)) ||
			(isValidHover && intervalEndDateHover <= item.date);
		const isInBetween =
			(!!value && !!secondaryValue && item.date < secondaryValue && item.date > value) || isValidHover;

		const isFirstSelection =
			isSelected &&
			!intervalEndDateHover &&
			(!intervalEndDate || (intervalStartDate && getTzIsSameDay(intervalStartDate, intervalEndDate)));

		const disabled = !checkIsValidRangeForDaysView({
			isIntervalPicker,
			maxSelectionRangeDays,
			intervalStartDate,
			intervalEndDate: intervalEndDateHover,
			currentDate: value,
			refDate: item.date,
			fromDate,
			toDate,
		});

		const getSelectionMode = () => {
			if (isSelected) return 'primary';

			if (isSecondarySelected) return 'secondary';

			if (isInBetween || intervalEndDateHover) return 'ternary';

			return undefined;
		};

		const isIntervalDay = (isSelected || isSecondarySelected || isInBetween) && isIntervalPicker;

		return (
			<View style={{ flex: 1, alignItems: 'center', marginBottom: 18 }}>
				<Pressable
					style={tw`w-full items-center justify-center`}
					onPress={() => {
						if (!disabled) {
							let selectedDate = item.date;

							if (enableTimeSelection) {
								const currentDateState = getTzTimeStates(item.date, currentCalendar);
								const { minutes, hours } = getTzTimeStates(tzDate, currentCalendar);

								selectedDate = getTzDate({ ...currentDateState, minutes, hours });
							}
							onClick(selectedDate);
						}
					}}
					onLongPress={() => {
						if (isIntervalPicker && intervalStartDate && !intervalEndDateHover && item.date > intervalStartDate) {
							updateViewState?.({ intervalEndDateHover: item.date });
						} else {
							updateViewState?.({ intervalEndDateHover: undefined });
						}
					}}
				>
					{isIntervalDay && (
						<View
							style={tw`${styles.intervalDayBackground(
								intervalStartDate && getTzIsSameDay(item.date, intervalStartDate),
								intervalEndDate && getTzIsSameDay(item.date, intervalEndDate),
								!isFirstSelection && item.currentMonth
							)}`}
						/>
					)}

					<View
						style={tw`${styles.dayItem(
							isSelected || isSecondarySelected || isInBetween,
							disabled,
							item.currentMonth,
							getSelectionMode(),
							isIntervalPicker,
							getTzIsSameDay(getTzTodayDate(), item.date)
						)}`}
					>
						<Text
							style={tw`${styles.dayItemText(
								isSelected || isSecondarySelected || isInBetween,
								disabled,
								item.currentMonth,
								getSelectionMode(),
								getTzIsSameDay(getTzTodayDate(), item.date)
							)}`}
						>
							{formatDate(item.date, { dateFormat: 'd', calendar: currentCalendar, locale })}
						</Text>
					</View>
				</Pressable>
			</View>
		);
	};

	const weekDaysItem = ({ item }: { item: { date: Date; currentMonth: boolean } }) => {
		return (
			<View style={[tw`${styles.dayViewDayNameItem}`, { flex: 1 }]}>
				<Text style={tw`nj-calendar-day-name-text`}>
					{formatDate(item.date, {
						dateFormat: locale === 'ar' ? 'EEEEE' : 'EEEEEE',
						calendar: currentCalendar,
						locale,
					})}
				</Text>
			</View>
		);
	};

	return (
		<View style={tw`${styles.dayViewContainer}`}>
			<View style={tw`${styles.dayViewDaysNamesContainer}`}>
				<FlatList
					data={daysToShow.filter((a, index) => index < 7)}
					renderItem={weekDaysItem}
					keyExtractor={(item) => item.date.toString()}
					numColumns={numColumns}
				/>
			</View>
			<View style={tw`${styles.daysViewGrid}`}>
				<FlatList
					data={daysToShow}
					renderItem={monthDaysItem}
					keyExtractor={(item) => item.date.toString()}
					numColumns={numColumns}
				/>
			</View>
		</View>
	);
};
