import { I18nManager, Pressable, Text, View } from 'react-native';
import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/native';
import { addYears, formatDate, getTzStartOfYear, setTimeToDay } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { checkIsValidRangeForMonthHeaderView } from '../utils/picker-navigation';
import { useCalendarViewContext } from './CalendarView';

export const MonthsViewHeader = () => {
	const {
		updateViewState,
		viewState: { tzDate, currentCalendar, intervalEndDate, intervalStartDate },
		fromDate,
		toDate,
		enableTimeSelection,
		isIntervalPicker,
		maxSelectionRangeDays,
	} = useCalendarViewContext();

	const { tw, locale } = useMobileUIConfigOptions();

	const currentYearDate = getTzStartOfYear(tzDate);

	const { allowNextYear, allowPreviousYear } = checkIsValidRangeForMonthHeaderView({
		isIntervalPicker,
		maxSelectionRangeDays,
		intervalStartDate,
		intervalEndDate,
		currentYearDate,
		toDate,
		fromDate,
	});

	return (
		<View style={tw`${styles.monthsAndYearsHeaderContainer}`}>
			<Pressable
				onPress={() => {
					if (allowPreviousYear) {
						const newDate = addYears(currentYearDate, -1);

						updateViewState({ tzDate: enableTimeSelection ? setTimeToDay(tzDate, newDate) : newDate });
					}
				}}
				hitSlop={16}
				style={[
					tw`${styles.navigationIconContainer(!allowPreviousYear)}`,
					I18nManager.isRTL && {
						transform: [
							{
								rotate: '180deg',
							},
						],
					},
				]}
			>
				<ArrowLeftIcon style={tw`${allowPreviousYear ? 'text-brand-600' : 'text-gray-500'}`} width={18} height={18} />
			</Pressable>

			<Pressable
				onPress={() => {
					updateViewState({ viewMode: 'years' });
				}}
				hitSlop={16}
			>
				<Text style={tw`text-brand-600`}>
					{formatDate(currentYearDate, {
						dateFormat: 'yyyy',
						calendar: currentCalendar,
						locale,
					})}
				</Text>
			</Pressable>
			<Pressable
				onPress={() => {
					if (allowNextYear) {
						const newDate = addYears(currentYearDate, +1);

						updateViewState({ tzDate: enableTimeSelection ? setTimeToDay(tzDate, newDate) : newDate });
					}
				}}
				style={[
					tw`${styles.navigationIconContainer(!allowNextYear)}`,
					I18nManager.isRTL && {
						transform: [
							{
								rotate: '180deg',
							},
						],
					},
				]}
			>
				<ArrowRightIcon style={tw`${allowNextYear ? 'text-brand-600' : 'text-gray-500'}`} width={18} height={18} />
			</Pressable>
		</View>
	);
};
