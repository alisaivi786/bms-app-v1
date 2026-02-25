import { getTzDate, getTzTimeStates } from '@devkit/utilities';
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

	return (
		<div className={styles.monthAndYearGrid}>
			{yearsArray.map((year, index) => {
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
					<div key={year} className={styles.monthAndYearItem(disabled)} onClick={() => onClick(currentYearDate)}>
						{hijriYearsArray[index]}
					</div>
				);
			})}
		</div>
	);
};
