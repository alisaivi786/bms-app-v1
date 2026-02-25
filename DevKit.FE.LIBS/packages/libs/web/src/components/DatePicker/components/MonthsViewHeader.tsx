import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/web';
import { addYears, formatDate, getTzStartOfYear, setTimeToDay } from '@devkit/utilities';
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
		<>
			<div
				className={styles.navigationIconContainer(!allowPreviousYear)}
				onClick={() => {
					if (allowPreviousYear) {
						const newDate = addYears(currentYearDate, -1);

						updateViewState({ tzDate: enableTimeSelection ? setTimeToDay(tzDate, newDate) : newDate });
					}
				}}
			>
				<ArrowLeftIcon className={styles.navigationIcon(!allowPreviousYear)} />
			</div>
			<div
				className={styles.dayViewLink.container}
				onClick={() => {
					updateViewState({ viewMode: 'years' });
				}}
			>
				{formatDate(currentYearDate, {
					dateFormat: 'yyyy',
					calendar: currentCalendar,
				})}
			</div>
			<div
				className={styles.navigationIconContainer(!allowNextYear)}
				onClick={() => {
					if (allowNextYear) {
						const newDate = addYears(currentYearDate, +1);

						updateViewState({ tzDate: enableTimeSelection ? setTimeToDay(tzDate, newDate) : newDate });
					}
				}}
			>
				<ArrowRightIcon className={styles.navigationIcon(!allowNextYear)} />
			</div>
		</>
	);
};
