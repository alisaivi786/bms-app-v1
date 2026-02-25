import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/web';
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
import { useResponsiveView } from '../../../hooks/useResponsiveView';
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
	const { sm } = useResponsiveView();

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

	const nextMonth = addMonths(tzDate, 1);

	return (
		<>
			<div
				className={styles.navigationIconContainer(!allowPreviousMonth)}
				onClick={() => {
					if (allowPreviousMonth) {
						const newTzDate = addMonths(addDays(getTzStartOfMonth(tzDate, currentCalendar), 2), -1);

						updateViewState({
							tzDate: enableTimeSelection ? setTimeToDay(tzDate, newTzDate) : newTzDate,
						});
					}
				}}
			>
				<ArrowLeftIcon className={styles.navigationIcon(!allowPreviousMonth)} />
			</div>
			<div className="flex flex-1 justify-center  gap-8">
				<div
					className={styles.dayViewLink.container}
					onClick={() => {
						if (!sameMonth) updateViewState({ viewMode: 'months' });
					}}
				>
					{formatDate(tzDate, {
						dateFormat: 'MMMM',
						calendar: currentCalendar,
					})}
				</div>
				<div
					className={styles.dayViewLink.container}
					onClick={() => {
						if (!sameYear) updateViewState({ viewMode: 'years' });
					}}
				>
					{formatDate(tzDate, {
						dateFormat: 'yyyy',
						calendar: currentCalendar,
					})}
				</div>
			</div>
			{isIntervalPicker && !sm && (
				<div className="flex flex-1 justify-center  gap-8">
					<div
						className={styles.dayViewLink.container}
						onClick={() => {
							if (!sameMonth) updateViewState({ viewMode: 'months' });
						}}
					>
						{formatDate(nextMonth, {
							dateFormat: 'MMMM',
							calendar: currentCalendar,
						})}
					</div>
					<div
						className={styles.dayViewLink.container}
						onClick={() => {
							if (!sameYear) updateViewState({ viewMode: 'years' });
						}}
					>
						{formatDate(nextMonth, {
							dateFormat: 'yyyy',
							calendar: currentCalendar,
						})}
					</div>
				</div>
			)}
			<div
				className={styles.navigationIconContainer(!allowNextMonth)}
				onClick={() => {
					if (allowNextMonth) {
						const newTzDate = addMonths(addDays(getTzStartOfMonth(tzDate, currentCalendar), 2), 1);

						updateViewState({
							tzDate: enableTimeSelection ? setTimeToDay(tzDate, newTzDate) : newTzDate,
						});
					}
				}}
			>
				<ArrowRightIcon className={styles.navigationIcon(!allowNextMonth)} />
			</div>
		</>
	);
};
