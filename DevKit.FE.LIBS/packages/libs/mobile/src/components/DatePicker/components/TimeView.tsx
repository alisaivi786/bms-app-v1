import { useState } from 'react';
import { View } from 'react-native';
import { getDateUtilsConfig, getTzDate, getTzTimeStates } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import Button from '../../Buttons/Button';
import styles from '../date-picker.styles';
import { useCalendarViewContext } from './CalendarView';

// import { WheelPicker } from './WheelPicker';

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
	const { onDateSelection, onCancelSelection, isIntervalPicker } = useCalendarViewContext();

	const { tw, isRtlLocale } = useMobileUIConfigOptions();

	const { getLatestTzDate } = useDateWheelPicker(currentSelectedDate);

	return (
		<View style={tw`w-full mb-2`}>
			{/* <View style={tw`flex items-center`}>
				<WheelPicker items={hourItemsWithDisabled} onChange={setHour} value={hour} />
				<WheelPicker items={minuteItemsWithDisabled} onChange={setMinute} value={minute} />
				{timeFormat === '12hr' && <WheelPicker items={ampmItemsWithDisabled} onChange={setAmpm} value={ampm} />}
			</View> */}
			{!hideButtons && (
				<View style={tw`${styles.timeButtons(isRtlLocale)}`}>
					<Button
						variant="social"
						size="small"
						onPress={() => {
							onCancelSelection();
						}}
						layoutClassName="w-full"
					>
						{isRtlLocale ? 'إلغاء' : 'Cancel'}
					</Button>
					<Button
						variant="primary"
						size="small"
						onPress={() => {
							onDateSelection(getLatestTzDate());
						}}
						layoutClassName="w-full"
					>
						{isRtlLocale ? 'موافق' : 'Apply'}
					</Button>
				</View>
			)}
			{isIntervalPicker && (
				<View style={tw`flex justify-end w-full pt-4 pb-2 pe-4`}>
					<Button
						variant="text"
						size="xSmall"
						onPress={() => {
							onValueChange?.(getLatestTzDate());
						}}
					>
						{isRtlLocale ? 'موافق' : 'Apply'}
					</Button>
				</View>
			)}
		</View>
	);
};
