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
} from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../date-picker.styles';
import { checkIsValidRangeForDaysView } from '../utils/picker-navigation';
import { CalendarViewState, useCalendarViewContext } from './CalendarView';

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
	const { locale } = useWebUIConfigOptions();
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

	return (
		<div className={styles.dayViewContainer}>
			<div className={styles.dayViewDaysNamesContainer}>
				{daysToShow
					.filter((a, index) => index < 7)
					.map((day, idx) => {
						return (
							<div key={idx} className={styles.dayViewDayNameItem}>
								{formatDate(day.date, {
									dateFormat: locale === 'ar' ? 'EEEEE' : 'EEEEEE',
									calendar: currentCalendar,
								})}
							</div>
						);
					})}
			</div>
			<div className={styles.daysViewGrid}>
				{daysToShow.map((day, idx) => {
					const isValidHover =
						!!intervalEndDateHover &&
						!!intervalStartDate &&
						intervalEndDateHover > intervalStartDate &&
						day.date > intervalStartDate &&
						day.date <= intervalEndDateHover;

					const isSelected = !!value && getTzIsSameDay(value, day.date);
					const isSecondarySelected =
						(!!secondaryValue && getTzIsSameDay(secondaryValue, day.date)) ||
						(isValidHover && intervalEndDateHover <= day.date);
					const isInBetween =
						(!!value && !!secondaryValue && day.date < secondaryValue && day.date > value) || isValidHover;

					const isFirstSelection =
						isSelected &&
						!intervalEndDateHover &&
						(!intervalEndDate || (intervalStartDate && getTzIsSameDay(intervalStartDate, intervalEndDate)));

					const disabled = !checkIsValidRangeForDaysView({
						isIntervalPicker,
						maxSelectionRangeDays,
						intervalStartDate,
						intervalEndDate,
						currentDate: value,
						refDate: day.date,
						fromDate,
						toDate,
					});

					const getSelectionMode = () => {
						if (isSelected) return 'primary';

						if (isSecondarySelected) return 'secondary';

						if (isInBetween || intervalEndDateHover) return 'ternary';

						return undefined;
					};

					return (
						<div
							key={idx}
							className={styles.dayItem(
								isSelected || isSecondarySelected || isInBetween,
								disabled,
								day.currentMonth,
								getSelectionMode(),
								isIntervalPicker,
								isFirstSelection
							)}
							onClick={() => {
								if (!disabled) {
									let selectedDate = day.date;

									if (enableTimeSelection) {
										const currentDateState = getTzTimeStates(day.date, currentCalendar);
										const { minutes, hours } = getTzTimeStates(tzDate, currentCalendar);

										selectedDate = getTzDate({ ...currentDateState, minutes, hours });
									}
									onClick(selectedDate);
								}
							}}
							onMouseOver={() => {
								if (isIntervalPicker && intervalStartDate && !intervalEndDate && day.date > intervalStartDate) {
									updateViewState?.({ intervalEndDateHover: day.date });
								} else updateViewState?.({ intervalEndDateHover: undefined });
							}}
						>
							{formatDate(day.date, {
								dateFormat: 'd',
								calendar: currentCalendar,
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};
