import { FlatList, Pressable, Text, View } from 'react-native';
import { getTzDate, getTzTimeStates } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { checkIsValidRangeForYearView } from '../utils/picker-navigation';
import { useCalendarViewContext } from './CalendarView';

export const YearsView = ({ onClick }: { onClick: (selectedDate: Date) => void }) => {
	const {
		viewState: { tzDate, viewNavigate, currentCalendar, intervalStartDate, intervalEndDate },
		fromDate,
		toDate,
		isIntervalPicker,
		maxSelectionRangeDays,
	} = useCalendarViewContext();

	const { tw } = useMobileUIConfigOptions();

	const { year, ...resetDateState } = getTzTimeStates(tzDate);
	const middleYear = year + viewNavigate;
	const yearsArray = [];

	const { year: hijriYear } = getTzTimeStates(tzDate, currentCalendar);
	const hijriMiddleYear = hijriYear + viewNavigate;
	const hijriYearsArray: number[] = [];

	for (let i = 1; i < 13; i++) {
		yearsArray.push(middleYear - 5 + i);
		hijriYearsArray.push(hijriMiddleYear - 5 + i);
	}

	const yearItem = ({ item: year, index }: { item: number; index: number }) => {
		const currentYearDate = getTzDate({ ...resetDateState, year });
		const disabled = !checkIsValidRangeForYearView({
			isIntervalPicker,
			maxSelectionRangeDays,
			intervalStartDate,
			intervalEndDate,
			currentYearDate,
			toDate,
			fromDate,
			currentCalendar,
		});

		return (
			<View style={tw`${styles.monthItemsContainer}`}>
				<Pressable onPress={() => onClick(currentYearDate)} hitSlop={16} disabled={disabled}>
					<Text style={disabled && tw`text-gray-500`}>{hijriYearsArray[index]}</Text>
				</Pressable>
			</View>
		);
	};

	return (
		<View style={tw`${styles.monthAndYearGrid}`}>
			<FlatList data={yearsArray} renderItem={yearItem} keyExtractor={(item) => item.toString()} numColumns={4} />
		</View>
	);
};
