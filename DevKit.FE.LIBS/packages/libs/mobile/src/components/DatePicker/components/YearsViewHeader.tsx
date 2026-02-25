import { I18nManager, Pressable, Text, View } from 'react-native';
import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/native';
import { getTzDate, getTzTimeStates } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { checkIsValidRangeForYearHeaderView } from '../utils/picker-navigation';
import { useCalendarViewContext } from './CalendarView';

export const YearsViewHeader = () => {
	const {
		updateViewState,
		viewState: { viewNavigate, tzDate, currentCalendar, intervalEndDate, intervalStartDate },
		toDate,
		fromDate,
		isIntervalPicker,
		maxSelectionRangeDays,
	} = useCalendarViewContext();

	const { tw } = useMobileUIConfigOptions();

	const { year: gregorianYear } = getTzTimeStates(tzDate);
	const { year } = getTzTimeStates(tzDate, currentCalendar);
	const startYear = year + viewNavigate - 4;
	const endYear = year + viewNavigate + 7;
	const gregorianStartYear = gregorianYear + viewNavigate - 4;
	const gregorianEndYear = gregorianYear + viewNavigate + 7;
	const startYearDate = getTzDate({ year: gregorianStartYear, month: 1, day: 1 });
	const endYearDate = getTzDate({ year: gregorianEndYear, month: 1, day: 1 });

	const { allowNextYears, allowPreviousYears } = checkIsValidRangeForYearHeaderView({
		isIntervalPicker,
		maxSelectionRangeDays,
		intervalStartDate,
		intervalEndDate,
		currentCalendar,
		startYearDate,
		toDate,
		fromDate,
		endYearDate,
	});

	return (
		<View style={tw`${styles.monthsAndYearsHeaderContainer}`}>
			<Pressable
				onPress={() => {
					if (allowPreviousYears) updateViewState({ viewNavigate: viewNavigate - 12 });
				}}
				style={[
					tw`${styles.navigationIconContainer(!allowPreviousYears)}`,
					I18nManager.isRTL && {
						transform: [
							{
								rotate: '180deg',
							},
						],
					},
				]}
			>
				<ArrowLeftIcon style={tw`${allowPreviousYears ? 'text-brand-600' : 'text-gray-500'}`} width={18} height={18} />
			</Pressable>
			<Text style={tw`text-brand-600`}>
				{startYear} - {endYear}
			</Text>
			<Pressable
				onPress={() => {
					if (allowNextYears) updateViewState({ viewNavigate: viewNavigate + 12 });
				}}
				style={[
					tw`${styles.navigationIconContainer(!allowNextYears)}`,
					I18nManager.isRTL && {
						transform: [
							{
								rotate: '180deg',
							},
						],
					},
				]}
			>
				<ArrowRightIcon style={tw`${allowNextYears ? 'text-brand-600' : 'text-gray-500'}`} width={18} height={18} />
			</Pressable>
		</View>
	);
};
