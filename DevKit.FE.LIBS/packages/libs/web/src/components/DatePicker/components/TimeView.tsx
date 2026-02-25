import { min } from 'lodash';
import { useEffect, useState } from 'react';
import { getDateUtilsConfig, getTzDate, getTzIsSameDay, getTzTimeStates } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import Button from '../../Buttons/Button';
import styles from '../date-picker.styles';
import { ampmItems, hourItems, minuteItems } from '../utils';
import { useCalendarViewContext } from './CalendarView';
import WheelPicker from './WheelPicker';

const useDateWheelPicker = (tzDate: Date) => {
	const { hours, minutes, day, month, year } = getTzTimeStates(tzDate);

	const originalTzDateHour = hours;
	const { timeFormat } = getDateUtilsConfig();
	const [hour, setHour] = useState(
		timeFormat === '12hr' && originalTzDateHour > 12 ? originalTzDateHour - 12 : originalTzDateHour
	);
	const [minute, setMinute] = useState(minutes);
	const [ampm, setAmpm] = useState(hours >= 12 ? 'PM' : 'AM');

	const getLatestTzDate = () => {
		const newHour = timeFormat === '12hr' ? (ampm === 'AM' ? hour % 12 : (hour % 12) + 12) : hour;

		const newTzDate = getTzDate({
			year: year,
			month: month,
			day: day,
			hours: newHour,
			minutes: minute,
		});

		return newTzDate;
	};

	return {
		hour,
		minute,
		ampm,
		setHour,
		setMinute,
		setAmpm,
		getLatestTzDate,
	};
};

export const TimeView = ({
	hideButtons = false,
	onValueChange,
	currentSelectedDate,
}: {
	currentSelectedDate: Date;
	hideButtons?: boolean;
	onValueChange?: (val: Date) => void;
}) => {
	const {
		onDateSelection,
		onCancelSelection,
		fromDate: originalFromDate,
		toDate: originalToDate,
		isIntervalPicker,
	} = useCalendarViewContext();

	// mocking fromDate and toDate to get time as per timeZone
	const fromDate = originalFromDate
		? (() => {
				const fromStates = getTzTimeStates(originalFromDate);

				return {
					getHours: () => fromStates.hours,
					getMinutes: () => fromStates.minutes,
				};
		  })()
		: undefined;

	const toDate = originalToDate
		? (() => {
				const toStates = getTzTimeStates(originalToDate);

				return {
					getHours: () => toStates.hours,
					getMinutes: () => toStates.minutes,
				};
		  })()
		: undefined;

	const { hour, minute, ampm, setHour, setMinute, setAmpm, getLatestTzDate } = useDateWheelPicker(currentSelectedDate);
	const [enable12, setEnable12] = useState(false);

	const { timeFormat } = getDateUtilsConfig();

	const { isRtlLocale } = useWebUIConfigOptions();

	const isFromDateSameAsoriginalTzDate = originalFromDate && getTzIsSameDay(originalFromDate, currentSelectedDate);
	const isToDateSameAsoriginalTzDate = originalToDate && getTzIsSameDay(originalToDate, currentSelectedDate);

	// Calculate minHour, maxHour, minMinute, maxMinute based on fromDate, toDate, and ampm
	let minHour = 0;
	let maxHour = timeFormat === '12hr' ? 11 : 23;
	let minMinute = 0;
	let maxMinute = 59;

	if (fromDate !== undefined && isFromDateSameAsoriginalTzDate && timeFormat === '12hr') {
		const fromHours = fromDate.getHours();

		minHour = fromHours % 12;
		minMinute = fromDate.getMinutes();

		if (fromHours >= 12 && ampm === 'AM') {
			minHour += 12;
			maxHour = 11;
		} else if (!toDate && fromHours >= 12) {
			maxHour = 11;
		}

		if (fromHours < 12 && ampm === 'PM') {
			minHour -= 12;
		}

		if (minHour === 0) {
			minHour = 0; // Set minHour to 12 if it becomes 0
		}
	}

	if (toDate !== undefined && isToDateSameAsoriginalTzDate && timeFormat === '12hr') {
		if (toDate && ampm === 'PM' && fromDate && toDate.getHours() < fromDate.getHours()) {
			maxHour = min([toDate.getHours() % 12, fromDate.getHours() % 12]) || 12;
			maxMinute = toDate.getMinutes();
		} else if (toDate && ampm === 'AM' && fromDate && fromDate?.getHours() > 12) {
			maxHour = toDate.getHours() % 12;
			maxMinute = toDate.getMinutes();
		} else if (toDate && ampm === 'AM' && fromDate && fromDate?.getHours() < 12) {
			maxHour = toDate.getHours();
			maxMinute = toDate.getMinutes();
		} else if (toDate && ampm === 'PM' && toDate?.getHours() < 12) {
			maxHour = -1;
			maxMinute = 0;
		} else if (toDate && ampm === 'PM' && toDate?.getHours() >= 12) {
			maxHour = toDate.getHours() % 12;
			maxMinute = toDate.getMinutes();
		} else {
			maxHour = toDate.getHours();
			maxMinute = toDate.getMinutes();
		}
	}

	if (fromDate !== undefined && isFromDateSameAsoriginalTzDate && timeFormat === '24hr') {
		minHour = fromDate.getHours();
		minMinute = fromDate.getMinutes();
	}

	if (toDate !== undefined && isToDateSameAsoriginalTzDate && timeFormat === '24hr') {
		maxHour = toDate.getHours();
		maxMinute = toDate.getMinutes();
	}

	// Generate hour items with disabled options
	const hourItemsWithDisabled = hourItems().map((item) => {
		const value = item.value;
		let isDisabled =
			value < minHour ||
			value > maxHour ||
			(fromDate && value === 12 && ampm === 'AM' && timeFormat === '12hr') ||
			false;

		// If 12 PM is within the range and the enable12 flag is true, enable it
		if (enable12 && value === 12 && ampm === 'PM' && timeFormat === '12hr') {
			isDisabled = false;
		}

		// enable 12 am if there is toDate and it is less than 12
		if (toDate && toDate.getHours() < 12 && value === 12 && ampm === 'AM' && timeFormat === '12hr') {
			isDisabled = false;
		} else if (toDate && toDate.getHours() > 12 && value === 12 && ampm === 'PM' && timeFormat === '12hr') {
			isDisabled = false;
		}

		return { ...item, isDisabled };
	});

	// Generate minute items with disabled options
	const minuteItemsWithDisabled = minuteItems.map((item) => {
		const value = item.value;
		const isDisabled = (hour === minHour && value < minMinute) || (hour === maxHour && value > maxMinute);

		return { ...item, isDisabled };
	});

	// Generate AM/PM items with disabled options based on date range
	const ampmItemsWithDisabled = ampmItems.map((item) => {
		const isFromDate = originalFromDate ? getTzIsSameDay(currentSelectedDate, originalFromDate) : undefined;
		const isToDate = originalToDate ? getTzIsSameDay(currentSelectedDate, originalToDate) : undefined;
		const fromDateHours = fromDate?.getHours() ?? 0;
		const toDateHours = toDate?.getHours() ?? 0;

		const isDisabled =
			(isFromDate && hour === 12 && item.value === 'AM') || (isToDate && hour === 12 && item.value === 'PM');

		if (isFromDate && fromDateHours < 12 && isToDate && toDateHours >= 12) {
			return { ...item, isDisabled: false };
		}

		if (isFromDate && fromDateHours >= 12 && isToDate && toDateHours >= 12) {
			return { ...item, isDisabled: item.value === 'AM' };
		}

		if (isFromDate && fromDateHours < 12 && isToDate && toDateHours < 12) {
			return { ...item, isDisabled: item.value === 'PM' };
		}

		if (isFromDate && fromDateHours >= 12 && isToDate && toDateHours < 12) {
			return { ...item, isDisabled: item.value === 'PM' };
		}

		if (isFromDate && !toDate && fromDateHours >= 12) {
			return { ...item, isDisabled: item.value === 'AM' };
		}

		if (isToDate && toDateHours < 12) {
			return { ...item, isDisabled: item.value === 'PM' };
		}

		return { ...item, isDisabled: isDisabled };
	});

	useEffect(() => {
		if (fromDate && fromDate?.getHours() < 12 && toDate && toDate?.getHours() >= 12 && timeFormat === '12hr') {
			setEnable12(true);
		} else {
			if (timeFormat === '12hr') {
				setEnable12(false);
			}
		}
	}, [fromDate, toDate]);

	return (
		<div className="w-full">
			<div className="flex items-center">
				<WheelPicker items={hourItemsWithDisabled} onChange={setHour} value={hour} />
				<WheelPicker items={minuteItemsWithDisabled} onChange={setMinute} value={minute} />
				{timeFormat === '12hr' && <WheelPicker items={ampmItemsWithDisabled} onChange={setAmpm} value={ampm} />}
			</div>
			{!hideButtons && (
				<div className={styles.timeButtons(isRtlLocale)}>
					<Button
						variant="secondary"
						size="small"
						onClick={() => {
							onCancelSelection();
						}}
						layoutClassName="w-full"
					>
						{isRtlLocale ? 'إلغاء' : 'Cancel'}
					</Button>
					<Button
						variant="primary"
						size="small"
						onClick={() => {
							onDateSelection(getLatestTzDate());
						}}
						layoutClassName="w-full"
					>
						{isRtlLocale ? 'موافق' : 'Apply'}
					</Button>
				</div>
			)}
			{isIntervalPicker && (
				<div className="w-full flex justify-end pt-4 pb-2 pe-4">
					<Button
						variant="text"
						size="xSmall"
						onClick={() => {
							onValueChange?.(getLatestTzDate());
						}}
					>
						{isRtlLocale ? 'موافق' : 'Apply'}
					</Button>
				</div>
			)}
		</div>
	);
};
