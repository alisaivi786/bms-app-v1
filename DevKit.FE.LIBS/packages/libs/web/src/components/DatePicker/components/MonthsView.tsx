import { formatDate, getTzEachMonthOfInterval, getTzEndOfYear, getTzStartOfYear, setTimeToDay } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
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

	const { isRtlLocale } = useWebUIConfigOptions();
	const startOfYear = getTzStartOfYear(tzDate, currentCalendar);
	const endOfYear = getTzEndOfYear(tzDate, currentCalendar);

	const months = getTzEachMonthOfInterval({
		tzDateStart: startOfYear,
		tzDateEnd: endOfYear,
		calendar: currentCalendar,
	});

	return (
		<div className={styles.monthAndYearGrid}>
			{months.map((currentMonthDate, monthIndex) => {
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
					<div
						key={monthIndex}
						className={styles.monthAndYearItem(disabled)}
						onClick={() => {
							if (!disabled) {
								const selectedDate = enableTimeSelection ? setTimeToDay(tzDate, currentMonthDate) : currentMonthDate;

								onClick(selectedDate);
							}
						}}
					>
						{formatDate(currentMonthDate, {
							dateFormat: isRtlLocale ? 'MMMM' : 'MMM',
							calendar: currentCalendar,
						})}
					</div>
				);
			})}
		</div>
	);
};
