import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/web';
import { getTzDate, getTzTimeStates } from '@devkit/utilities';
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
		<>
			<div
				className={styles.navigationIconContainer(!allowPreviousYears)}
				onClick={() => {
					if (allowPreviousYears) updateViewState({ viewNavigate: viewNavigate - 12 });
				}}
			>
				<ArrowLeftIcon className={styles.navigationIcon(!allowPreviousYears)} />
			</div>
			<div>
				{startYear} - {endYear}
			</div>
			<div
				className={styles.navigationIconContainer(!allowNextYears)}
				onClick={() => {
					if (allowNextYears) updateViewState({ viewNavigate: viewNavigate + 12 });
				}}
			>
				<ArrowRightIcon className={styles.navigationIcon(!allowNextYears)} />
			</div>
		</>
	);
};
